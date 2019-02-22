package graphql;

import models.User;
import utilities.ThreadStorage;

public class QLUser {
    public static class Query {
        public String currentUser() {
            // Lookup user by firebase token
            User user = User.findByFirebaseUid(ThreadStorage.get().uid);
            return user.getId().toString();
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
}
