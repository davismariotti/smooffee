package graphql;

import actions.OrganizationActions;
import models.Organization;
import models.User;
import services.authorization.Permission;
import utilities.ThreadStorage;

public class QLOrganization {
    public static class Query {
        public OrganizationEntry current() {
            Permission.check(Permission.THIS_ORGANIZATION);
            Organization organization = User.findByFirebaseUid(ThreadStorage.get().uid).getOrganization();

            return new OrganizationEntry(organization);
        }

        public OrganizationEntry read(Long id) {
            Permission.check(Permission.THIS_ORGANIZATION);
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
            Permission.check(Permission.ALL);
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

        public OrganizationEntry(Organization organization) {
            this.id = organization.getId();
            this.name = organization.getName();
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}