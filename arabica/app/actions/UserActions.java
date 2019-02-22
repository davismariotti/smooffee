package actions;

import models.Organization;
import models.User;

public class UserActions {

    public User createUser(String firstname, String lastname, String fireBaseUserId, String email, Long organizationId) {
        User potentialUser = User.findByFirebaseUid(fireBaseUserId);
        if (potentialUser == null) {
            User newUser = new User();
            newUser.setFirstname(firstname);
            newUser.setLastname(lastname);
            newUser.setEmail(email);
            newUser.setFirebaseUserId(fireBaseUserId);

            Organization org = Organization.find.byId(organizationId);
            newUser.setOrganization(org);
            newUser.save();
            newUser.refresh();
            return newUser;
        } else {
            return null; // TODO
        }
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
