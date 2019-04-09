package actions;

import models.BaseModel;
import models.Organization;
import utilities.QLException;

public class OrganizationActions {

    public static Organization createOrganization(String name) {
        if (name == null) return null;

        return new Organization()
            .setName(name)
            .setStatus(BaseModel.ACTIVE)
            .store();
    }

    public static Organization updateOrganization(Organization organization, String name, Integer status) {
        if (organization == null || name == null || status == null) return null;

        organization.setName(name);
        organization.setStatus(status);
        organization.save();
        return organization;
    }

    public static Organization deleteOrganization(Organization organization) {
        return organization.deprecate();
    }
}
