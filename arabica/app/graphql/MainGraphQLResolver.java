package graphql;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;

public class MainGraphQLResolver {

    public static class Query implements GraphQLQueryResolver {
        public String ping() {
            return "pong";
        }
        public QLUser.Query user() {
            return new QLUser.Query();
        }

        public QLOrganization.Query organization() {
            return new QLOrganization.Query();
        }

        public QLProduct.Query product() {
            return new QLProduct.Query();
        }
    }

    public static class Mutation implements GraphQLMutationResolver {
        public QLUser.Mutation user() {
            return new QLUser.Mutation();
        }

        public QLOrganization.Mutation organization() {
            return new QLOrganization.Mutation();
        }

        public QLProduct.Mutation product() {
            return new QLProduct.Mutation();
        }
    }
}
