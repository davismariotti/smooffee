package actions;

import graphql.QLUser;
import models.Organization;
import models.User;

public class UserActions {

    public static User createUser(String firstname, String lastname, String fireBaseUserId, String email, Long organizationId) {
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

    public static User updateUser(String uid, QLUser.UserInput input) {
        User user = User.findByFirebaseUid(uid);
        if (user == null) {
            return null;
        }
        user.setFirstname(input.getFirstname());
        user.setLastname(input.getLastname());
        user.setEmail(input.getEmail());
        user.save();
        user.refresh();
        return user;
    }

    public static boolean deleteUser() {
        return false;
    }

    public static boolean sendForgotPassword() {
        return false;
    }
}
