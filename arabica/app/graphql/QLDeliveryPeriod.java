package graphql;

import actions.DeliveryPeriodActions;
import actions.PaymentActions;
import models.*;
import services.authorization.AuthorizationContext;
import services.authorization.Permission;
import utilities.QLException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class QLDeliveryPeriod {
    public static class Query {
        public DeliveryPeriodEntry read(Long id) {
            DeliveryPeriod deliveryPeriod = DeliveryPeriod.find.byId(id);
            if (deliveryPeriod == null) throw new QLException("Delivery Period not found.");
            
            Permission.check(Permission.THIS_ORGANIZATION_DELIVERY_PERIODS_READ, new AuthorizationContext(deliveryPeriod.getOrganization()));
            return new DeliveryPeriodEntry(deliveryPeriod);
        }

        public List<DeliveryPeriodEntry> list(Long organizationId, List<Integer> statuses) {
            Organization organization = Organization.find.byId(organizationId);
            if (organization == null) throw new QLException("Organization not found.");
            Permission.check(Permission.THIS_ORGANIZATION_DELIVERY_PERIODS_READ, new AuthorizationContext(organization));

            List<DeliveryPeriod> deliveryPeriods = DeliveryPeriod.findDeliveryPeriodsByOrganizationId(organizationId, statuses);

            return deliveryPeriods.stream().map(DeliveryPeriodEntry::new).collect(Collectors.toList());
        }
    }

    public static class Mutation {
        public DeliveryPeriodEntry create(Long organizationId, DeliveryPeriodInput deliveryPeriodInput) {
            Organization organization = Organization.find.byId(organizationId);
            if (organization == null) throw new QLException("Organization not found.");

            Permission.check(Permission.THIS_ORGANIZATION_SETTINGS_WRITE, new AuthorizationContext(organization));

            return new DeliveryPeriodEntry(DeliveryPeriodActions.createDeliveryPeriod(organizationId, deliveryPeriodInput.getClassPeriod()));
        }

        public DeliveryPeriodEntry update(Long deliveryPeriodId, DeliveryPeriodInput deliveryPeriodInput) {
            DeliveryPeriod deliveryPeriod = DeliveryPeriod.find.byId(deliveryPeriodId);
            if (deliveryPeriod == null) throw new QLException("Delivery Period not found.");

            Permission.check(Permission.THIS_ORGANIZATION_SETTINGS_WRITE, new AuthorizationContext(deliveryPeriod.getOrganization()));

            return new DeliveryPeriodEntry(DeliveryPeriodActions.updateDeliveryPeriod(deliveryPeriodId, deliveryPeriodInput.getClassPeriod(), deliveryPeriodInput.getStatus()));
        }
    }

    public static class DeliveryPeriodInput extends QLInput {
        private Integer classPeriod;

        public Integer getClassPeriod() {
            return classPeriod;
        }

        public void setClassPeriod(Integer classPeriod) {
            this.classPeriod = classPeriod;
        }
    }

    public static class DeliveryPeriodEntry extends QLEntry {
        private Integer classPeriod;

        public DeliveryPeriodEntry(DeliveryPeriod deliveryPeriod) {
            super(deliveryPeriod);
            this.classPeriod = deliveryPeriod.getClassPeriod();
        }

        public Integer getClassPeriod() {
            return classPeriod;
        }
    }
}
