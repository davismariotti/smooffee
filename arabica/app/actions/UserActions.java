package actions;

import io.ebean.Ebean;
import models.Organization;
import models.User;

public class UserActions {

    public User createUser(String firstname, String lastname, String password, String email, Long organizationId) {
        User newUser = new User();
        newUser.setFirstname(firstname);
        newUser.setLastname(lastname);
        newUser.setEmail(email);
        Organization org = Ebean.find(Organization.class).where().eq("id", organizationId).findOne();
        newUser.setOrganization(org);
        newUser.save();
        newUser.refresh();
        return newUser;
    }

    public User updateUser() {
        return null;
    }

    public boolean deleteUser() {
        return false;
    }

    public boolean sendForgotPassword() {
        return false;
    }
}
