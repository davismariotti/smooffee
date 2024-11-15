package graphql;

import actions.UserActions;
import com.google.firebase.auth.FirebaseAuthException;
import com.stripe.model.Card;
import com.sun.jersey.api.client.ClientResponse;
import models.BaseModel;
import models.Organization;
import models.User;
import services.AuthenticationService;
import services.authorization.AuthorizationContext;
import services.authorization.Permission;
import services.authorization.Role;
import utilities.*;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

public class QLUser {
    public static class Query {
        public UserEntry currentUser() {
            User user = User.findByFirebaseUid(ThreadStorage.get().uid);
            if (user == null) throw new QLException("User not found.");
            Permission.check(Permission.THIS_USER_INFO_READ, new AuthorizationContext(user));

            return new UserEntry(user);
        }

        public UserEntry read(String id) {
            User user = User.findByFirebaseUid(id);
            if (user == null) throw new QLException("User not found.");
            Permission.check(Permission.THIS_USER_INFO_READ, new AuthorizationContext(user));

            return new UserEntry(user);
        }

        public List<UserEntry> list(Long organizationId, QLFinder finder) {
            Organization organization = Organization.find.byId(organizationId);
            if (organization == null) throw new QLException("Organization not found.");
            Permission.check(Permission.THIS_ORGANIZATION_USERS_READ, new AuthorizationContext(organization));

            List<User> users = User.findWithParamters(finder)
                    .where()
                    .eq("organization_id", organizationId)
                    .findList();

            return users.stream().map(UserEntry::new).collect(Collectors.toList());
        }

        public List<CardEntry> listCards(String userId) {
            User user = User.findByFirebaseUid(userId);
            if (user == null) throw new QLException("User not found.");
            Permission.check(Permission.THIS_USER_CARD_READ, new AuthorizationContext(user));

            List<Card> cards = UserActions.listCards(user);

            return cards.stream().map(CardEntry::new).collect(Collectors.toList());
        }
    }

    public static class Mutation {
        public UserEntry create(Long organizationId, UserInput userInput) throws FirebaseAuthException {
            Organization organization = Organization.find.byId(organizationId);
            if (organization == null) throw new QLException("Organization not found.");
            Permission.ignore();

            String uid = ThreadStorage.get().uid;
            String email = AuthenticationService.getEmailFromUid(uid);
            User user = UserActions.createUser(organization, uid, userInput.getFirstName(), userInput.getLastName(), email);
            return new UserEntry(user);
        }

        public UserEntry update(String userId, UserInput userInput) {
            User user = User.findByFirebaseUid(userId);
            if (user == null) throw new QLException("User not found.");
            Permission.check(Permission.THIS_USER_INFO_WRITE, new AuthorizationContext(user));

            user = UserActions.updateUser(user, userInput);
            return (user == null) ? null : new UserEntry(user);
        }

        public UserEntry updateStatus(String userId, String  status) {
            User user = User.findByFirebaseUid(userId);
            if (user == null) throw new QLException("User not found.");
            Permission.check(Permission.OTHER_USER_INFO_WRITE, new AuthorizationContext(user));

            user.setStatus(BaseModel.statusStringToInt(status)).store();

            return new UserEntry(user);
        }

        public UserEntry updateRole(String userId, String role) {
            User user = User.findByFirebaseUid(userId);
            if (user == null) throw new QLException("User not found.");

            Permission.check(Permission.THIS_ORGANIZATION_CHANGE_USER_ROLE, new AuthorizationContext(user.getOrganization()));

            // TODO use int values of role
            if (role.equals(Role.SYSADMIN.getName()) || role.equals(Role.ANONYMOUS.getName())) throw new Permission.AccessDeniedException(); // Can't make a user a sysadmin

            return new UserEntry(user.setRole(Role.fromName(role).getValue()).store());
        }

        public CardEntry attachCard(String userId, String stripeToken) {
            User user = User.findByFirebaseUid(userId);
            if (user == null) throw new QLException("User not found.");

            Permission.check(Permission.THIS_USER_CARD_WRITE, new AuthorizationContext(user));

            Card card = UserActions.addStripeCardToUser(user, stripeToken);

            return new CardEntry(card);
        }

        public String feedback(String message) {
            // Get the calling user
            User user = User.findByFirebaseUid(ThreadStorage.get().uid);
            if (user == null) throw new QLException("User not found.");
            Permission.check(Permission.THIS_ORGANIZATION_SHARE_FEEDBACK, new AuthorizationContext(user.getOrganization()));

            // Get admins in their organization
            List<User> admins = User.findAdminsByOrganizationId(user.getOrganization().getId());

            String formattedMessage = String.format("The following feedback was sent by %s %s (id: %s): \n\n%s", user.getFirstName(), user.getLastName(), user.getFirebaseUserId(), message);

            for (User admin : admins) {
                ClientResponse rsp = MailGunEmailProvider.sendEmail(String.format("%s %s", admin.getFirstName(), admin.getLastName()), admin.getEmail(), "Feedback from user", formattedMessage);
                ArabicaLogger.logger.debug("test");
            }

            return "Success!";
        }
    }

    public static class UserInput {
        String firstName;
        String lastName;

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
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
        private String status;
        private User user;

        private String createdAt;
        private List<QLPayment.PaymentEntry> payments;
        private List<QLOrder.OrderEntry> orders;
        private List<CardEntry> cards;

        public UserEntry(User user) {
            this.user = user;
            this.id = user.getFirebaseUserId();
            this.firstName = user.getFirstName();
            this.lastName = user.getLastName();
            this.email = user.getEmail();
            this.organizationId = user.getOrganization().getId();
            this.balance = user.getBalance();
            this.role = user.getRole().getName();
            this.status = BaseModel.statusIntToString(user.getStatus());
            this.createdAt = new SimpleDateFormat("MM-dd-yyyy").format(user.getCreatedAt());
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

        public String  getStatus() {
            return status;
        }

        public String getCreatedAt() {
            return createdAt;
        }

        public List<QLOrder.OrderEntry> getOrders() {
            Permission.check(Permission.THIS_USER_ORDER_READ, new AuthorizationContext(user));
            if (orders == null) orders = user.getOrders().stream().map(QLOrder.OrderEntry::new).collect(Collectors.toList());
            return orders;
        }

        public List<QLPayment.PaymentEntry> getPayments() {
            Permission.check(Permission.THIS_USER_PAYMENT_READ, new AuthorizationContext(user));
            if (payments == null) payments = user.getPayments().stream().map(QLPayment.PaymentEntry::new).collect(Collectors.toList());
            return payments;
        }

        public List<CardEntry> getCards() {
            Permission.check(Permission.THIS_USER_CARD_READ, new AuthorizationContext(user));
            if (cards == null) cards = UserActions.listCards(user).stream().map(CardEntry::new).collect(Collectors.toList());
            return cards;
        }
    }

    public static class CardEntry {
        String stripeCardId;
        String last4;
        String brand;

        public CardEntry(Card card) {
            this.brand = card.getBrand();
            this.last4 = card.getLast4();
            this.stripeCardId = card.getId();
        }

        public String getStripeCardId() {
            return stripeCardId;
        }

        public String getLast4() {
            return last4;
        }

        public String getBrand() {
            return brand;
        }
    }
}
