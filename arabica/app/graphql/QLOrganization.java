package graphql;

import actions.OrganizationActions;
import models.Organization;
import models.User;
import services.authorization.Permission;
import utilities.ThreadStorage;

import java.util.List;
import java.util.stream.Collectors;

public class QLOrganization {
    public static class Query {

        public OrganizationEntry read(Long id) {
            Permission.check(Permission.THIS_ORGANIZATION_READ);
            // Lookup user by firebase token
            Organization organization = Organization.find.byId(id);
            if (organization == null) {
                return null;
            }
            return new OrganizationEntry(organization);
        }
    }

    public static class Mutation {
        public OrganizationEntry create(OrganiationInput input) {
            Permission.check(Permission.ORGANIZATION_CREATE);
            return new OrganizationEntry(OrganizationActions.createOrganization(input.getName()));
        }
    }

    public static class OrganiationInput {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static class OrganizationEntry {
        private Long id;
        private String name;
        private Organization organization;

        public OrganizationEntry(Organization organization) {
            this.id = organization.getId();
            this.name = organization.getName();
            this.organization = organization;
        }

        public Long getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public List<QLProduct.ProductEntry> getProducts() {
            return organization.getProducts().stream().map(QLProduct.ProductEntry::new).collect(Collectors.toList());
        }
    }
}
