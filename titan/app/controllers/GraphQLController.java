package controllers;

import com.coxautodev.graphql.tools.SchemaParser;
import com.google.gson.Gson;
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.MainGraphQLResolver;
import graphql.schema.GraphQLSchema;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import java.util.LinkedHashMap;
import java.util.Map;

public class GraphQLController extends Controller {

    private Gson gson = new Gson();

    public Result graphql(Http.Request request) {
        request.body();

        GraphQLSchema schema = SchemaParser.newParser()
                .file("schema/root.graphql")
                .resolvers(new MainGraphQLResolver.Query())
                .build()
                .makeExecutableSchema();

        GraphQL root = GraphQL.newGraphQL(schema).build();

        Map<String, Object> result = new LinkedHashMap<>();
        ExecutionResult executionResult = root.execute(gson.toJson(request.body().asJson().toString()));
        result.put("data", executionResult.getData());

        return ok(Json.toJson(result));
    }



}
