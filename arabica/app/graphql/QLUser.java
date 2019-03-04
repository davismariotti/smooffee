package graphql;

import actions.PaymentActions;
import actions.UserActions;
import models.Payment;
import models.User;
import services.authorization.Permission;
import utilities.QLException;
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
        public UserEntry create(Long organizationId, UserInput userInput) {
            Permission.ignore();
            String uid = ThreadStorage.get().uid;
            User user = UserActions.createUser(userInput.firstName, userInput.lastName, uid, userInput.email, organizationId);
            if (user == null) {
                return null;
            }
            return new UserEntry(user);
        }

        public UserEntry update(UserInput userInput) {
            Permission.check(Permission.THIS_USER);
            User user = UserActions.updateUser(ThreadStorage.get().uid, userInput);
            return (user == null) ? null : new UserEntry(user);
        }

        public PaymentEntry makePayment(String userId, PaymentInput paymentInput) {
            if (paymentInput.getType().equals("card")) {
                return new PaymentEntry(PaymentActions.makeCardPayment(userId, paymentInput.getAmount(), paymentInput.getCardId()));

            } else if (paymentInput.getType().equals("cash")) {
                return new PaymentEntry(PaymentActions.makeCashPayment(userId, paymentInput.getAmount()));
            } else throw new QLException("Type not valid");
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

        public UserEntry(User user) {
            this.id = user.getFirebaseUserId();
            this.firstName = user.getFirstname();
            this.lastName = user.getLastname();
            this.email = user.getEmail();
            this.organizationId = user.getOrganization().getId();
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
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

    public static class PaymentInput {
        private String type;
        private Integer amount;
        private Long cardId;

        public Long getCardId() {
            return cardId;
        }

        public void setCardId(Long cardId) {
            this.cardId = cardId;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public Integer getAmount() {
            return amount;
        }

        public void setAmount(Integer amount) {
            this.amount = amount;
        }
    }

    public static class PaymentEntry {
        private Long id;
        private Integer amount;
        private Long cardId;
        private UserEntry user;

        public PaymentEntry(Payment payment) {
            this.id = payment.getId();
            this.amount = payment.getAmount();
            this.cardId = payment.getCard().getId();
            this.user = new UserEntry(payment.getUser());
        }

        public UserEntry getUser() {
            return user;
        }

        public void setUser(UserEntry user) {
            this.user = user;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public Long getCardId() {
            return cardId;
        }

        public void setCardId(Long cardId) {
            this.cardId = cardId;
        }

        public Integer getAmount() {
            return amount;
        }

        public void setAmount(Integer amount) {
            this.amount = amount;
        }
    }
}
