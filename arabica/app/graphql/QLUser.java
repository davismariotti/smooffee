package graphql;

import actions.UserActions;
import models.User;
import services.authorization.AuthorizationContext;
import services.authorization.Permission;
import services.authorization.Role;
import utilities.QLException;
import utilities.ThreadStorage;

public class QLUser {
    public static class Query {
        public UserEntry read(String id) {
            Permission.check(Permission.THIS_USER_INFO_READ, new AuthorizationContext(id));
            // Lookup user by firebase token
            User user = User.findByFirebaseUid(id);
            if (user == null) throw new QLException("User not found.");

            return new UserEntry(user);
        }
    }

    public static class Mutation {
        public UserEntry create(Long organizationId, UserInput userInput) {
            Permission.ignore();
            String uid = ThreadStorage.get().uid;
            User user = UserActions.createUser(userInput.firstName, userInput.lastName, uid, userInput.email, organizationId);
            if (user == null) {
                return null; // TODO what if user exists?
            }
            return new UserEntry(user);
        }

        public UserEntry update(String userId, UserInput userInput) {
            Permission.check(Permission.THIS_USER_INFO_WRITE, new AuthorizationContext(userId));
            User user = UserActions.updateUser(userId, userInput);
            return (user == null) ? null : new UserEntry(user);
        }

        public UserEntry promote(String userId, String role) {
            User user = User.findByFirebaseUid(userId);
            if (user == null) throw new QLException("User not found.");

            Permission.check(Permission.THIS_ORGANIZATION_CHANGE_USER_ROLE, new AuthorizationContext(user.getOrganization().getId()));

            // TODO use int values of role
            if (role.equals(Role.SYSADMIN.getName()) || role.equals(Role.ANONYMOUS.getName())) throw new Permission.AccessDeniedException(); // Can't make a user a sysadmin

            return new UserEntry(user.setRole(Role.valueOf(role).getValue()).store());
        }
    }

    public static class UserInput {
        String firstName;
        String lastName;
        String email;

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
    }

    public static class UserEntry {
        private String id;
        private String firstName;
        private String lastName;
        private String email;
        private Long organizationId;
        private Integer balance;
        private String role;

        public UserEntry(User user) {
            this.id = user.getFirebaseUserId();
            this.firstName = user.getFirstname();
            this.lastName = user.getLastname();
            this.email = user.getEmail();
            this.organizationId = user.getOrganization().getId();
            this.balance = user.getBalance();
            this.role = user.getRole().getName();
        }

        public Integer getBalance() {
            return balance;
        }

        public String getId() {
            return id;
        }

        public String getFirstname() {
            return firstName;
        }

        public String getLastname() {
            return lastName;
        }

        public String getEmail() {
            return email;
        }

        public Long getOrganizationId() {
            return organizationId;
        }

        public String getRole() {
            return role;
        }
    }
}
