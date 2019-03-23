package controllers;

import com.coxautodev.graphql.tools.SchemaParser;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.gson.Gson;
import graphql.*;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.With;
import services.authorization.Permission;
import utilities.ArabicaLogger;
import services.AuthenticationService;
import utilities.ThreadStorage;

import java.util.LinkedHashMap;
import java.util.Map;

public class GraphQLController extends Controller {

    private Gson gson = new Gson();

    private int count = 0;

    @With(Headers.class)
    public Result options() {
        return noContent();
    }

    @With(Headers.class)
    public Result graphql(Http.Request request) {
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
                return forbidden();
            }
            String authToken = request.getHeaders().get("Authorization").get();
            if (authToken.equals("Bearer undefined")) {
                count++;
                return forbidden();
            }

            try {
                uid = AuthenticationService.getUidFromToken(authToken.replace("Bearer", "").trim());
            } catch (FirebaseAuthException | IllegalArgumentException e) {
                count++;
                e.printStackTrace();
                return forbidden();
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
            return forbidden();
        }

        if (ThreadStorage.get() != null && !ThreadStorage.get().hasCheckedPermissions) {
            ArabicaLogger.logger.warn("Permissions not checked!");
        }

        ArabicaLogger.logger.debug("[RSP-" + count +"] - " + executionResult.getData());
        count++;

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("data", executionResult.getData());

        if (executionResult.getErrors() != null && executionResult.getErrors().size() > 0) {
            result.put("errors", executionResult.getErrors());
        }

        ThreadStorage.remove();

        return ok(Json.toJson(result));
    }

    static class Query {
        String query;
        String operationName;
        Map<String,Object> variables;
    }


}
