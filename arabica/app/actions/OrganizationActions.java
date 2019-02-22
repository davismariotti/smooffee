package actions;

import models.Organization;

public class OrganizationActions {

    public Organization createOrganization(String name) {
        Organization newOrg = new Organization();
        newOrg.setName(name);
        newOrg.save();
        newOrg.refresh();
        return newOrg;
    }

    public Organization updateOrganization(Long organizationId, String name) {
        Organization organization = Organization.find.byId(organizationId);
        if (organization == null) {
            // TODO
            return null;
        }
        organization.setName(name);
        organization.save();
        return organization;
    }

    public boolean deleteOrganization() {
        return false; // TODO
    }
}
