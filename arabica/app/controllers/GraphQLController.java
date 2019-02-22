package controllers;

import com.coxautodev.graphql.tools.SchemaParser;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.gson.Gson;
import graphql.ExecutionInput;
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.MainGraphQLResolver;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import utilities.ArabicaLogger;
import utilities.Authenticator;
import utilities.ThreadStorage;

import java.util.LinkedHashMap;
import java.util.Map;

public class GraphQLController extends Controller {

    private Gson gson = new Gson();

    private int count = 0;

    public Result graphql(Http.Request request) throws IllegalAccessException { // TODO Exception handling
        Query query = gson.fromJson(request.body().asJson().toString(), Query.class);
        String uid;

        if (!query.query.startsWith("query IntrospectionQuery {")) {
            // Get firebase token
            String authToken = request.getHeaders().get("Authorization").orElseThrow(IllegalAccessException::new);
            if (authToken.equals("Bearer undefined")) {
                return forbidden();
            }

            try {
                uid = Authenticator.getUidFromToken(authToken.replace("Bearer ", ""));
            } catch (FirebaseAuthException e) {
                ArabicaLogger.logger.error("auth error", e);
                return forbidden();
            }
            ThreadStorage.Storage storage = new ThreadStorage.Storage();
            storage.uid = uid;
            ThreadStorage.put(storage);
        }

        ArabicaLogger.logger.debug("[REQ-" + count +"] - " + query.query.replace("\n", "").replace("\t", ""));

        ExecutionInput input = ExecutionInput.newExecutionInput()
                .query(query.query)
                .operationName(query.operationName)
                .variables(query.variables)
                .build();

        GraphQL root = GraphQL.newGraphQL(SchemaParser.newParser()
                .file("schema/root.graphql")
                .file("schema/auth.graphql")
                .file("schema/user.graphql")
                .resolvers(new MainGraphQLResolver.Query())
                .build()
                .makeExecutableSchema()).build();

        ExecutionResult executionResult = root.execute(input);

        if (ThreadStorage.get() != null && !ThreadStorage.get().hasCheckedPermissions) {
            ArabicaLogger.logger.warn("Permissions not checked!");
        }

        ArabicaLogger.logger.debug("[RSP-" + count +"] - " + executionResult.getData());

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("data", executionResult.getData());

        if (executionResult.getErrors() != null && executionResult.getErrors().size() > 0) {
            result.put("errors", executionResult.getErrors());
        }

        count++;
        return ok(Json.toJson(result));
    }

    static class Query {
        String query;
        String operationName;
        Map<String,Object> variables;
    }


}
