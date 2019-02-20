package controllers;

import com.coxautodev.graphql.tools.SchemaParser;
import com.google.gson.Gson;
import graphql.ExecutionInput;
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.MainGraphQLResolver;
import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import java.util.LinkedHashMap;
import java.util.Map;

public class GraphQLController extends Controller {

    private final static Logger.ALogger logger = Logger.of("titan");

    private Gson gson = new Gson();

    private int count = 0;

    public Result graphql(Http.Request request) {
        Query query = gson.fromJson(request.body().asJson().toString(), Query.class);

        logger.debug("[REQ-" + count +"] - " + query.query.replace("\n", ""));

        ExecutionInput input = ExecutionInput.newExecutionInput()
                .query(query.query)
                .operationName(query.operationName)
                .variables(query.variables)
                .build();

        GraphQL root = GraphQL.newGraphQL(SchemaParser.newParser()
                .file("schema/root.graphql")
                .file("schema/auth.graphql")
                .resolvers(new MainGraphQLResolver.Query())
                .build()
                .makeExecutableSchema()).build();

        ExecutionResult executionResult = root.execute(input);

        logger.debug("[RSP-" + count +"] - " + executionResult.getData());

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
