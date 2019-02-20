package graphql;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;

public class MainGraphQLResolver {

    public static class Query implements GraphQLQueryResolver {
        public String ping() {
            return "pong";
        }
    }
}
