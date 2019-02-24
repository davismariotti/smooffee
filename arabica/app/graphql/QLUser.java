package graphql;

import actions.UserActions;
import models.User;
import services.authorization.Permission;
import utilities.ThreadStorage;

public class QLUser {
    public static class Query {
        public UserEntry currentUser() {
            Permission.check(Permission.THIS_USER, ThreadStorage.get().uid);
            // Lookup user by firebase token
            User user = User.findByFirebaseUid(ThreadStorage.get().uid);
            if (user == null) {
                return null;
            }
            return new UserEntry(user);
        }

        public UserEntry read(String id) {
            Permission.check(Permission.OTHER_USERS, id);
            // Lookup user by firebase token
            User user = User.findByFirebaseUid(id);
            if (user == null) {
                return null;
            }

            return new UserEntry(user);
        }
    }

    public static class Mutation {
        public UserEntry create(QLUser.UserInput userInput) {
            Permission.ignore();
            String uid = ThreadStorage.get().uid;
            User user = new UserActions().createUser(userInput.firstName, userInput.lastName, uid, userInput.email, userInput.organizationId);
            if (user == null) {
                return null;
            }
            return new UserEntry(user);
        }
    }

    public static class UserInput {
        String firstName;
        String lastName;
        String email;
        Long organizationId;

        public String getFirstname() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastname() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public Long getOrganizationId() {
            return organizationId;
        }

        public void setOrganizationId(Long organizationId) {
            this.organizationId = organizationId;
        }
    }

    public static class UserEntry {
        String firstName;
        String lastName;
        String email;
        Long organizationId;

        public UserEntry(User user) {
            this.firstName = user.getFirstname();
            this.lastName = user.getLastname();
            this.email = user.getEmail();
            this.organizationId = user.getOrganization().getId();
        }

        public String getFirstname() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastname() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public Long getOrganizationId() {
            return organizationId;
        }

        public void setOrganizationId(Long organizationId) {
            this.organizationId = organizationId;
        }
    }
}
