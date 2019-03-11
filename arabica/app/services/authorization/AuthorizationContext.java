package services.authorization;

import models.Organization;
import models.User;

public class AuthorizationContext {

    private Organization organization;
    private User user;

    public AuthorizationContext(Organization organization, User user) {
        this.organization = organization;
        this.user = user;
    }
    public AuthorizationContext(User user) {
        this.user = user;
    }

    public AuthorizationContext(Organization organization) {
        this.organization = organization;
    }

    public Organization getOrganization() {
        return organization;
    }

    public User getUser() {
        return user;
    }
}
