package graphql;

import actions.OrganizationActions;
import models.BaseModel;
import models.Organization;
import services.authorization.AuthorizationContext;
import services.authorization.Permission;
import utilities.QLException;
import utilities.QLFinder;

import java.util.List;
import java.util.stream.Collectors;

public class QLOrganization {
    public static class Query {

        public OrganizationEntry read(Long id) {
            Organization organization = Organization.find.byId(id);
            if (organization == null) throw new QLException("Organization not found.");
            Permission.check(Permission.THIS_ORGANIZATION_READ, new AuthorizationContext(organization));

            return new OrganizationEntry(organization);
        }

        public List<OrganizationEntry> list(QLFinder parameters) {
            Permission.check(Permission.ORGANIZATION_LIST);

            List<Organization> organizations = Organization.findWithParamters(parameters)
                    .where()
                    .not()
                    .eq("status", BaseModel.DELETED)
                    .findList();

            return organizations.stream().map(OrganizationEntry::new).collect(Collectors.toList());
        }
    }

    public static class Mutation {
        public OrganizationEntry create(OrganizationInput input) {
            Permission.check(Permission.ORGANIZATION_CREATE);
            return new OrganizationEntry(OrganizationActions.createOrganization(input.getName()));
        }

        public OrganizationEntry update(Long organizationId, OrganizationInput organizationInput) {
            Organization organization = Organization.find.byId(organizationId);
            if (organization == null) throw new QLException("Organization not found.");
            Permission.check(Permission.THIS_ORGANIZATION_SETTINGS_WRITE, new AuthorizationContext(organization));

            return new OrganizationEntry(OrganizationActions.updateOrganization(organization, organizationInput.getName()));
        }

        public OrganizationEntry updateStatus(Long organizationId, Integer status) {
            Organization organization = Organization.find.byId(organizationId);
            if (organization == null) throw new QLException("Organization not found.");
            Permission.check(Permission.ALL);

            organization.setStatus(status).store();

            return new OrganizationEntry(organization);
        }
    }

    public static class OrganizationInput {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static class OrganizationEntry extends QLEntry {
        private String name;
        private Organization organization;

        public OrganizationEntry(Organization organization) {
            super(organization);
            this.name = organization.getName();
            this.organization = organization;
        }

        public String getName() {
            return name;
        }

        public List<QLProduct.ProductEntry> getProducts() {
            Permission.check(Permission.THIS_ORGANIZATION_PRODUCTS_READ, new AuthorizationContext(organization));
            return organization.getProducts().stream().map(QLProduct.ProductEntry::new).collect(Collectors.toList());
        }

        public List<QLUser.UserEntry> getUsers() {
            Permission.check(Permission.THIS_ORGANIZATION_USERS_READ, new AuthorizationContext(organization));
            return organization.getUsers().stream().map(QLUser.UserEntry::new).collect(Collectors.toList());
        }

        public List<QLDeliveryPeriod.DeliveryPeriodEntry> getDeliveryPeriods() {
            Permission.check(Permission.THIS_ORGANIZATION_DELIVERY_PERIODS_READ, new AuthorizationContext(organization));
            return organization.getDeliveryPeriods().stream().map(QLDeliveryPeriod.DeliveryPeriodEntry::new).collect(Collectors.toList());
        }
    }
}
