package actions;

import models.BaseModel;
import models.Organization;

public class OrganizationActions {

    public static Organization createOrganization(String name) {
        if (name == null) return null;

        return new Organization()
                .setName(name)
                .setStatus(BaseModel.ACTIVE)
                .store();
    }

    public static Organization updateOrganization(Organization organization, String name) {
        if (organization == null || name == null) return null;

        organization.setName(name)
                .store();

        return organization;
    }

    public static Organization updateStripeDetails(Organization organization, String stripe_pk, String stripe_sk) {
        if (organization == null) return null;

        organization.setSecretApiKey(stripe_sk)
                .setPublishableApiKey(stripe_pk)
                .store();

        return organization;
    }

    public static Organization deleteOrganization(Organization organization) {
        return organization.deprecate();
    }
}
