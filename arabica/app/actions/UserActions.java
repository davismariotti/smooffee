package actions;

import graphql.QLUser;
import models.Organization;
import models.User;
import utilities.QLException;

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
        if (user == null) throw new QLException("User not found");
        user.setFirstname(input.getFirstname());
        user.setLastname(input.getLastname());
        user.setEmail(input.getEmail()); // TODO Allow?
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

    public static User addToBalance(String userId, Integer amount) {
        User user = User.findByFirebaseUid(userId);
        if (user == null) throw new QLException("User not found");
        return user.setBalance(user.getBalance() + amount).store();
    }

    public static User removeFromBalance(String userId, int amount) {
        User user = User.findByFirebaseUid(userId);
        if (user == null) throw new QLException("User not found");
        return user.setBalance(user.getBalance() - amount).store();
    }
}
