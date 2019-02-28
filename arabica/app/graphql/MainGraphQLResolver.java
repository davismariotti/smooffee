package graphql;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import services.authorization.Permission;

public class MainGraphQLResolver {

    public static class Query implements GraphQLQueryResolver {
        public String ping() {
            Permission.ignore();
            return "pong";
        }
        public QLUser.Query user() {
            return new QLUser.Query();
        }

        public QLOrganization.Query organization() {
            return new QLOrganization.Query();
        }
    }

    public static class Mutation implements GraphQLMutationResolver {
        public QLUser.Mutation user() {
            return new QLUser.Mutation();
        }

        public QLOrganization.Mutation organization() {
            return new QLOrganization.Mutation();
        }
    }
}
