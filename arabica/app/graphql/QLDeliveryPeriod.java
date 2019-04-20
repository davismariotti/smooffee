package graphql;

import actions.DeliveryPeriodActions;
import models.*;
import services.authorization.AuthorizationContext;
import services.authorization.Permission;
import utilities.QLException;
import utilities.QLFinder;

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

        public List<DeliveryPeriodEntry> list(Long organizationId, QLFinder parameters) {
            Organization organization = Organization.find.byId(organizationId);
            if (organization == null) throw new QLException("Organization not found.");
            Permission.check(Permission.THIS_ORGANIZATION_DELIVERY_PERIODS_READ, new AuthorizationContext(organization));

            List<DeliveryPeriod> deliveryPeriods = DeliveryPeriod.findWithParamters(parameters)
                    .where()
                    .eq("organization.id", organizationId)
                    .findList();

            return deliveryPeriods.stream().map(DeliveryPeriodEntry::new).collect(Collectors.toList());
        }
    }

    public static class Mutation {
        public DeliveryPeriodEntry create(Long organizationId, DeliveryPeriodInput deliveryPeriodInput) {
            Organization organization = Organization.find.byId(organizationId);
            if (organization == null) throw new QLException("Organization not found.");

            Permission.check(Permission.THIS_ORGANIZATION_SETTINGS_WRITE, new AuthorizationContext(organization));

            return new DeliveryPeriodEntry(DeliveryPeriodActions.createDeliveryPeriod(
                    organization,
                    deliveryPeriodInput.getClassPeriod(),
                    deliveryPeriodInput.getMaxQueueSize(),
                    deliveryPeriodInput.getMonday(),
                    deliveryPeriodInput.getTuesday(),
                    deliveryPeriodInput.getWednesday(),
                    deliveryPeriodInput.getThursday(),
                    deliveryPeriodInput.getFriday()
            ));
        }

        public DeliveryPeriodEntry update(Long deliveryPeriodId, DeliveryPeriodInput deliveryPeriodInput) {
            DeliveryPeriod deliveryPeriod = DeliveryPeriod.find.byId(deliveryPeriodId);
            if (deliveryPeriod == null) throw new QLException("Delivery Period not found.");

            Permission.check(Permission.THIS_ORGANIZATION_SETTINGS_WRITE, new AuthorizationContext(deliveryPeriod.getOrganization()));

            return new DeliveryPeriodEntry(DeliveryPeriodActions.updateDeliveryPeriod(
                    deliveryPeriod,
                    deliveryPeriodInput.getClassPeriod(),
                    deliveryPeriodInput.getMaxQueueSize(),
                    deliveryPeriodInput.getMonday(),
                    deliveryPeriodInput.getTuesday(),
                    deliveryPeriodInput.getWednesday(),
                    deliveryPeriodInput.getThursday(),
                    deliveryPeriodInput.getFriday()
            ));
        }

        public DeliveryPeriodEntry updateStatus(Long deliveryPeriodId, Integer status) {
            DeliveryPeriod deliveryPeriod = DeliveryPeriod.find.byId(deliveryPeriodId);
            if (deliveryPeriod == null) throw new QLException("Delivery Period not found.");

            Permission.check(Permission.THIS_ORGANIZATION_SETTINGS_WRITE, new AuthorizationContext(deliveryPeriod.getOrganization()));
            deliveryPeriod.setStatus(status).store();

            return new DeliveryPeriodEntry(deliveryPeriod);
        }
    }

    public static class DeliveryPeriodInput {
        private Integer classPeriod;
        private Integer maxQueueSize;
        private String monday;
        private String tuesday;
        private String wednesday;
        private String thursday;
        private String friday;

        public Integer getClassPeriod() {
            return classPeriod;
        }

        public void setClassPeriod(Integer classPeriod) {
            this.classPeriod = classPeriod;
        }

        public Integer getMaxQueueSize() {
            return maxQueueSize;
        }

        public void setMaxQueueSize(Integer maxQueueSize) {
            this.maxQueueSize = maxQueueSize;
        }

        public String getMonday() {
            return monday;
        }

        public void setMonday(String monday) {
            this.monday = monday;
        }

        public String getTuesday() {
            return tuesday;
        }

        public void setTuesday(String tuesday) {
            this.tuesday = tuesday;
        }

        public String getWednesday() {
            return wednesday;
        }

        public void setWednesday(String wednesday) {
            this.wednesday = wednesday;
        }

        public String getThursday() {
            return thursday;
        }

        public void setThursday(String thursday) {
            this.thursday = thursday;
        }

        public String getFriday() {
            return friday;
        }

        public void setFriday(String friday) {
            this.friday = friday;
        }
    }

    public static class DeliveryPeriodEntry extends QLEntry {
        private Integer classPeriod;
        private Integer maxQueueSize;

        private String monday;
        private String tuesday;
        private String wednesday;
        private String thursday;
        private String friday;

        public DeliveryPeriodEntry(DeliveryPeriod deliveryPeriod) {
            super(deliveryPeriod);
            this.classPeriod    = deliveryPeriod.getClassPeriod();
            this.maxQueueSize   = deliveryPeriod.getMaxQueueSize();
            this.monday         = deliveryPeriod.getMonday();
            this.tuesday        = deliveryPeriod.getTuesday();
            this.wednesday      = deliveryPeriod.getWednesday();
            this.thursday       = deliveryPeriod.getThursday();
            this.friday         = deliveryPeriod.getFriday();
        }

        public Integer getClassPeriod() {
            return classPeriod;
        }

        public Integer getMaxQueueSize() {
            return maxQueueSize;
        }

        public String getMonday() {
            return monday;
        }

        public String getTuesday() {
            return tuesday;
        }

        public String getWednesday() {
            return wednesday;
        }

        public String getThursday() {
            return thursday;
        }

        public String getFriday() {
            return friday;
        }
    }
}
