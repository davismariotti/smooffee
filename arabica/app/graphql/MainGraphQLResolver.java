package graphql;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;

public class MainGraphQLResolver {

    public static class Query implements GraphQLQueryResolver {
        public String ping() {
            return "pong";
        }

        public QLAuth.Query auth() {
            return new QLAuth.Query();
        }

        public QLUser.Query user() {
            return new QLUser.Query();
        }
    }
}
