package graphql;

import actions.UserActions;
import models.User;
import utilities.ThreadStorage;

public class QLAuth {
    public static class Query {
        public String createUser(QLUser.UserInput userInput) {
            String uid = ThreadStorage.get().uid;
            User user = new UserActions().createUser(userInput.firstName, userInput.lastName, uid, userInput.email, userInput.organizationId);

            if (user != null) {
                return user.getId().toString();
            }

            return "";
        }
    }
}
