package actions;

import models.BaseModel;
import models.Organization;
import utilities.QLException;

public class OrganizationActions {

    public static Organization createOrganization(String name) {
        return new Organization()
            .setName(name)
            .setStatus(BaseModel.ACTIVE)
            .store();
    }

    public static Organization updateOrganization(Long organizationId, String name) {
        Organization organization = Organization.find.byId(organizationId);
        if (organization == null) throw new QLException("Organization not found");

        organization.setName(name);
        organization.save();
        return organization;
    }

    public static boolean deleteOrganization(Long id) {
        Organization organization = Organization.find.byId(id);
        if (organization == null) throw new QLException("Organization not found");

        organization.deprecate();
        return true;
    }
}
