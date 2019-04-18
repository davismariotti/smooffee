package actions;

import business.StripeAPI;
import com.stripe.exception.StripeException;
import com.stripe.model.Card;
import com.stripe.model.Customer;
import graphql.QLUser;
import models.BaseModel;
import models.Organization;
import models.User;
import services.authorization.Role;
import utilities.QLException;

import java.util.List;

public class UserActions {

    public static User createUser(Organization organization, String fireBaseUserId, String firstname, String lastname,  String email) {
        if (organization == null || firstname == null || lastname == null || email == null) return null;

        User existingUser = User.findByFirebaseUid(fireBaseUserId);
        if (existingUser == null) {
            User newUser = new User()
                    .setFirstName(firstname)
                    .setLastName(lastname)
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

        user = user.setFirstName(input.getFirstName())
                .setLastName(input.getLastName())
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

    public static User addStripeCardToUser(User user, String token) {
        if (user == null || token == null) return null;

        if (user.getStripeCustomerId() == null) {
            try {
                Customer customer = StripeAPI.createCustomer(user, token);
                return user.setStripeCustomerId(customer.getId()).store();
            } catch (StripeException e) {
                throw new QLException(e);
            }
        } else {
            try {
                StripeAPI.addCardToCustomer(user, token);
                return user;
            } catch (StripeException e) {
                throw new QLException(e);
            }
        }
    }

    public static List<Card> listCards(User user) {
        if (user == null) return null;

        if (user.getStripeCustomerId() == null) throw new QLException("There are no cards on this customer.");

        try {
            return StripeAPI.listCards(user);
        } catch (StripeException e) {
            throw new QLException(e);
        }
    }
}
