package graphql;

import actions.OrderModifierActions;
import models.OrderModifier;
import models.Organization;
import services.authorization.AuthorizationContext;
import services.authorization.Permission;
import utilities.QLException;
import utilities.QLFinder;

import java.util.List;
import java.util.stream.Collectors;

public class QLOrderModifier {
    public static class Query {
        public OrderModifierEntry read(Long id) {
            OrderModifier orderModifier = OrderModifier.find.byId(id);
            if (orderModifier == null) throw new QLException("Order Modifier not found.");

            Permission.check(Permission.THIS_ORGANIZATION_SETTINGS_READ, new AuthorizationContext(orderModifier.getOrganization()));
            return new OrderModifierEntry(orderModifier);
        }

        public List<OrderModifierEntry> list(Long organizationId, QLFinder parameters) {
            Organization organization = Organization.find.byId(organizationId);
            if (organization == null) throw new QLException("Order Modifier not found.");
            Permission.check(Permission.THIS_ORGANIZATION_SETTINGS_READ, new AuthorizationContext(organization));

            List<OrderModifier> orderModifiers = OrderModifier.findWithParamters(parameters)
                    .where()
                    .eq("organization.id", organizationId)
                    .findList();

            return orderModifiers.stream().map(OrderModifierEntry::new).collect(Collectors.toList());
        }
    }

    public static class Mutation {
        public OrderModifierEntry create(Long organizationId, OrderModifierInput orderModifierInput) {
            Organization organization = Organization.find.byId(organizationId);
            if (organization == null) throw new QLException("Organization not found.");

            Permission.check(Permission.THIS_ORGANIZATION_SETTINGS_WRITE, new AuthorizationContext(organization));

            return new OrderModifierEntry(OrderModifierActions.createOrderModifier(
                    organization,
                    orderModifierInput.getName()
            ));
        }

        public OrderModifierEntry update(Long deliveryPeriodId, OrderModifierInput orderModifierInput) {
            OrderModifier orderModifier = OrderModifier.find.byId(deliveryPeriodId);
            if (orderModifier == null) throw new QLException("Order Modifier not found.");

            Permission.check(Permission.THIS_ORGANIZATION_SETTINGS_WRITE, new AuthorizationContext(orderModifier.getOrganization()));

            return new OrderModifierEntry(OrderModifierActions.updateOrderModifier(
                    orderModifier,
                    orderModifierInput.getName()
            ));
        }

        public OrderModifierEntry updateStatus(Long orderModifierId, Integer status) {
            OrderModifier orderModifier = OrderModifier.find.byId(orderModifierId);
            if (orderModifier == null) throw new QLException("Order Modifier not found.");

            Permission.check(Permission.THIS_ORGANIZATION_SETTINGS_WRITE, new AuthorizationContext(orderModifier.getOrganization()));
            orderModifier.setStatus(status).store();

            return new OrderModifierEntry(orderModifier);
        }
    }

    public static class OrderModifierInput {
        private String name;


        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static class OrderModifierEntry extends QLEntry {

        private String name;

        public OrderModifierEntry(OrderModifier orderModifier) {
            super(orderModifier);
            this.name = orderModifier.getName();
        }

        public String getName() {
            return name;
        }
    }
}
