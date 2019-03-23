package actions;

import graphql.QLUser;
import models.BaseModel;
import models.Organization;
import models.User;
import services.authorization.Role;

public class UserActions {

    public static User createUser(Organization organization, String fireBaseUserId, String firstname, String lastname,  String email) {
        if (organization == null || firstname == null || lastname == null || email == null) return null;

        User existingUser = User.findByFirebaseUid(fireBaseUserId);
        if (existingUser == null) {
            User newUser = new User()
                    .setFirstname(firstname)
                    .setLastname(lastname)
                    .setEmail(email)
                    .setFirebaseUserId(fireBaseUserId)
                    .setRole(Role.CUSTOMER.getValue())
                    .setBalance(0)
                    .setStatus(BaseModel.ACTIVE);

            newUser.setOrganization(organization);
            newUser.save();
            return newUser;
        } else {
            return null; // TODO
        }
    }

    public static User updateUser(User user, QLUser.UserInput input) { // TODO
        if (user == null || input == null) return null;

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

    public static User addToBalance(User user, Integer amount) {
        if (user == null || amount == null) return null;
        return user.setBalance(user.getBalance() + amount).store();
    }

    public static User removeFromBalance(User user, Integer amount) {
        if (user == null || amount == null) return null;

        return user.setBalance(user.getBalance() - amount).store();
    }
}
