package actions;

import models.Organization;

public class OrganizationActions {

    public static Organization createOrganization(String name) {
        Organization organization = new Organization();
        organization.setName(name);
        organization.save();
        organization.refresh();
        return organization;
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

    public static boolean deleteOrganization(Long id) {
        Organization organization = Organization.find.byId(id);
        if (organization == null) {
            return false;
        }
        organization.deprecate();
        organization.save();
        return true;
    }
}
