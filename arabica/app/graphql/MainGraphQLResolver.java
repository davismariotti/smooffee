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

        public QLOrder.Query order() {
            return new QLOrder.Query();
        }

        public QLPayment.Query payment() {
            return new QLPayment.Query();
        }

        public QLDeliveryPeriod.Query deliveryPeriod() {
            return new QLDeliveryPeriod.Query();
        }

        public QLOrderModifier.Query orderModifier() {
            return new QLOrderModifier.Query();
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

        public QLOrder.Mutation order() {
            return new QLOrder.Mutation();
        }

        public QLPayment.Mutation payment() {
            return new QLPayment.Mutation();
        }

        public QLDeliveryPeriod.Mutation deliveryPeriod() {
            return new QLDeliveryPeriod.Mutation();
        }

        public QLOrderModifier.Mutation orderModifier() {
            return new QLOrderModifier.Mutation();
        }
    }
}
