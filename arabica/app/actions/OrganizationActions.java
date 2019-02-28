package actions;

import models.Organization;

public class OrganizationActions {

    public static Organization createOrganization(String name) {
        Organization newOrg = new Organization();
        newOrg.setName(name);
        newOrg.save();
        newOrg.refresh();
        return newOrg;
    }

    public static Organization updateOrganization(Long organizationId, String name) {
        Organization organization = Organization.find.byId(organizationId);
        if (organization == null) {
            // TODO
            return null;
        }
        organization.setName(name);
        organization.save();
        return organization;
    }

    public static boolean deleteOrganization() {
        return false; // TODO
    }
}
