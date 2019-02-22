package graphql;

public class QLUser {

    public static class UserInput {
        public String firstName;
        public  String lastName;
        public String email;
        public String firebaseAuthToken;
        public Long organizationId;

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

        public String getFirebaseAuthToken() {
            return firebaseAuthToken;
        }

        public void setFirebaseAuthToken(String firebaseAuthToken) {
            this.firebaseAuthToken = firebaseAuthToken;
        }

        public Long getOrganizationId() {
            return organizationId;
        }

        public void setOrganizationId(Long organizationId) {
            this.organizationId = organizationId;
        }
    }
}
