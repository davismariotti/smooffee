package controllers;

import com.coxautodev.graphql.tools.SchemaParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.gson.Gson;
import graphql.*;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.With;
import services.AuthenticationService;
import services.authorization.Permission;
import utilities.ArabicaLogger;
import utilities.QLException;
import utilities.ThreadStorage;

import javax.inject.Inject;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

public class GraphQLController extends Controller {

    private static Gson gson = new Gson();

    private static int count = 0;

    private HttpExecutionContext httpExecutionContext;

    @Inject
    public GraphQLController(HttpExecutionContext ec) {
        this.httpExecutionContext = ec;
    }

    @With(Headers.class)
    public Result options() {
        return noContent();
    }

    @With(Headers.class)
    public CompletionStage<Result> graphql(Http.Request request) {
        return executeGraphQL(request).thenApplyAsync(result -> result, httpExecutionContext.current());
    }

    private static CompletionStage<Result> executeGraphQL(Http.Request request) {
        Query query = gson.fromJson(request.body().asText(), Query.class);
        if (query == null) {
            query = gson.fromJson(request.body().asJson().toString(), Query.class);
        }
        String uid;


        String log = String.format(
                "[REQ-%d] - %s%s",
                count,
                query.query.replace("\n", "").replace("\t", ""),
                query.variables != null ? query.variables : ""
        );

        ArabicaLogger.logger.debug(log);

        if (!query.query.trim().startsWith("query IntrospectionQuery {") && !query.query.startsWith("query { ping }")) {
            // Get firebase token
            if (!request.getHeaders().get("Authorization").isPresent()) {
                count++;
                return CompletableFuture.completedFuture(unauthorized());
            }
            String authToken = request.getHeaders().get("Authorization").get();
            if (authToken.equals("Bearer undefined")) {
                count++;
                return CompletableFuture.completedFuture(unauthorized());
            }

            try {
                uid = AuthenticationService.getUidFromToken(authToken.replace("Bearer", "").trim());
            } catch (FirebaseAuthException | IllegalArgumentException e) {
                count++;
                if (e.getMessage() != null) {
                    return CompletableFuture.completedFuture(unauthorized(e.getMessage()));
                }
                return CompletableFuture.completedFuture(unauthorized());
            }
            ThreadStorage.Storage storage = new ThreadStorage.Storage();
            storage.uid = uid;
            ThreadStorage.put(storage);
        }


        ExecutionInput input = ExecutionInput.newExecutionInput()
                .query(query.query)
                .operationName(query.operationName)
                .variables(query.variables)
                .build();

        GraphQL root = GraphQL.newGraphQL(SchemaParser.newParser()
                .file("schema/root.graphql")
                .file("schema/user.graphql")
                .file("schema/organization.graphql")
                .file("schema/product.graphql")
                .file("schema/order.graphql")
                .file("schema/payment.graphql")
                .file("schema/deliveryPeriod.graphql")
                .resolvers(new MainGraphQLResolver.Query(), new MainGraphQLResolver.Mutation())
                .build()
                .makeExecutableSchema()).build();

        ExecutionResult executionResult;
        try {
            executionResult = root.execute(input);
        } catch (Permission.AccessDeniedException e) {
            return CompletableFuture.completedFuture(forbidden(e.getMessage()));
        }

        if (ThreadStorage.get() != null && !ThreadStorage.get().hasCheckedPermissions) {
            ArabicaLogger.logger.warn("Permissions not checked!");
        }


        Map<String, Object> result = new LinkedHashMap<>();
        result.put("data", executionResult.getData());

        if (executionResult.getErrors() != null && executionResult.getErrors().size() > 0) {
            result.put("errors", executionResult.getErrors().stream().map(item -> {
                String errors = gson.toJson(item);
                Map<String, Object> map = gson.fromJson(errors, Map.class);
                if (item instanceof ExceptionWhileDataFetching && ((ExceptionWhileDataFetching) item).getException() instanceof QLException) {
                    map.put("code", ((QLException) ((ExceptionWhileDataFetching) item).getException()).getCode());
                }
                try {
                    ((Map<String, Object>) map.get("exception")).remove("stackTrace");
                } catch (Exception ex) {
                }
                try {
                    ((Map<String, Object>) ((Map<String, Object>) map.get("exception")).get("cause")).remove("stackTrace");
                } catch (Exception ex) {
                }
                return map;
            }));
        }

        ThreadStorage.remove();

        JsonNode node = Json.toJson(result);

        ArabicaLogger.logger.debug("[RSP-" + count + "] - " + node.toString());

        count++;

        return CompletableFuture.completedFuture(ok(node));
    }

    static class Query {
        String query;
        String operationName;
        Map<String, Object> variables;
    }


}
