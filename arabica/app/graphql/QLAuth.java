package graphql;

import actions.UserActions;
import com.google.firebase.auth.FirebaseAuthException;
import models.User;
import utilities.Authenticator;

public class QLAuth {
    public static class Query {
        public String createUser(QLUser.UserInput userInput) {
            try {
                String uid = Authenticator.getUidFromToken(userInput.firebaseAuthToken);
                User user = new UserActions().createUser(userInput.firstName, userInput.lastName, uid, userInput.email, userInput.organizationId);

                if (user != null) {
                    return user.getId().toString();
                }
            } catch (FirebaseAuthException e) {
                e.printStackTrace();
            }

            return "";
        }
    }
}
