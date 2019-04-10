package graphql;

import actions.PaymentActions;
import models.Payment;
import models.User;
import services.authorization.AuthorizationContext;
import services.authorization.Permission;
import utilities.QLException;
import utilities.QLFinder;

import java.util.List;
import java.util.stream.Collectors;

public class QLPayment {
    public static class Query {
        public PaymentEntry read(Long id) {
            Payment payment = Payment.find.byId(id);
            if (payment == null) throw new QLException("Payment not found.");
            
            Permission.check(Permission.THIS_USER_PAYMENT_READ, new AuthorizationContext(payment.getUser()));
            return new PaymentEntry(payment);
        }

        public List<PaymentEntry> list(String userId, QLFinder parameters) {
            User user = User.findByFirebaseUid(userId);
            if (user == null) throw new QLException("User not found.");

            Permission.check(Permission.THIS_USER_PAYMENT_READ, new AuthorizationContext(user));

            List<Payment> payments = Payment.findWithParamters(parameters).where().eq("user_id", userId).findList();

            return payments.stream().map(PaymentEntry::new).collect(Collectors.toList());
        }
    }

    public static class Mutation {
        public PaymentEntry create(String userId, PaymentInput paymentInput) {
            User user = User.findByFirebaseUid(userId);
            if (user == null) throw new QLException("User not found.");

            Permission.check(Permission.THIS_USER_PAYMENT_WRITE, new AuthorizationContext(user));

            if (paymentInput.getType().equals(Payment.CARD)) {
                return new PaymentEntry(PaymentActions.makeCardPayment(user, paymentInput.getAmount(), paymentInput.stripeCardId));
            } else {
                return new PaymentEntry(PaymentActions.makeCashPayment(user, paymentInput.getAmount()));
            }
        }
    }

    public static class PaymentInput extends QLInput {
        private String type;
        private Integer amount;
        private String stripeCardId;

        public String getStripeCardId() {
            return stripeCardId;
        }

        public void setStripeCardId(String stripeCardId) {
            this.stripeCardId = stripeCardId;
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

    public static class PaymentEntry extends QLEntry {
        private Integer amount;
        private String stripeCardId;
        private String type;
        private QLUser.UserEntry user;

        public PaymentEntry(Payment payment) {
            super(payment);
            this.amount = payment.getAmount();
            this.type = payment.getType();
            this.stripeCardId = payment.getStripeCardId();
            this.user = new QLUser.UserEntry(payment.getUser());
        }

        public String getType() {
            return type;
        }

        public QLUser.UserEntry getUser() {
            return user;
        }

        public String getCardId() {
            return stripeCardId;
        }

        public Integer getAmount() {
            return amount;
        }
    }
}
