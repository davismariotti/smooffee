package actions;

import graphql.QLUser;
import models.Organization;
import models.User;
import services.authorization.Role;
import utilities.QLException;

public class UserActions {

    public static User createUser(String firstname, String lastname, String fireBaseUserId, String email, Long organizationId) {
        User potentialUser = User.findByFirebaseUid(fireBaseUserId);
        if (potentialUser == null) {
            User newUser = new User()
                    .setFirstname(firstname)
                    .setLastname(lastname)
                    .setEmail(email)
                    .setFirebaseUserId(fireBaseUserId)
                    .setRole(Role.CUSTOMER.getValue())
                    .setBalance(0);

            Organization org = Organization.find.byId(organizationId);
            newUser.setOrganization(org);
            newUser.save();
            return newUser;
        } else {
            return null; // TODO
        }
    }

    public static User updateUser(String uid, QLUser.UserInput input) {
        User user = User.findByFirebaseUid(uid);
        if (user == null) throw new QLException("User not found");
        user = user.setFirstname(input.getFirstName())
                .setLastname(input.getLastName())
                .setEmail(input.getEmail()) // TODO Allow?
                .store();
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
