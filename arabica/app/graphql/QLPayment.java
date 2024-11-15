package graphql;

import actions.PaymentActions;
import models.BaseModel;
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
                if (paymentInput.getStripeCardId() != null) {
                    return new PaymentEntry(PaymentActions.makeCardPayment(user, paymentInput.getAmount(), paymentInput.getStripeCardId()));
                } else if (paymentInput.getStripeToken() != null) {
                    return new PaymentEntry(PaymentActions.makeOneOffCardPayment(user, paymentInput.getAmount(), paymentInput.getStripeToken()));
                } else throw new QLException("Payment must contain stripe token or stripe card id.");
            } else {
                return new PaymentEntry(PaymentActions.makeCashPayment(user, paymentInput.getAmount()));
            }
        }

        public PaymentEntry updateStatus(Long paymentId, String status) {
            Payment payment = Payment.find.byId(paymentId);
            if (payment == null) throw new QLException("Payment not found.");

            Permission.check(Permission.OTHER_USER_PAYMENT_WRITE, new AuthorizationContext(payment.getUser()));

            payment.setStatus(BaseModel.statusStringToInt(status)).store();

            return new PaymentEntry(payment);
        }

        public PaymentEntry refundPayment(Long paymentId) {
            Payment payment = Payment.find.byId(paymentId);
            if (payment == null) throw new QLException("Payment not found.");

            Permission.check(Permission.THIS_ORGANIZATION_CREATE_PAYMENT_REFUND, new AuthorizationContext(payment.getUser().getOrganization()));

            return new PaymentEntry(PaymentActions.refundPayment(payment));
        }
    }

    public static class PaymentInput {
        private String type;
        private Integer amount;
        private String stripeCardId;
        private String stripeToken;

        public String getStripeCardId() {
            return stripeCardId;
        }

        public void setStripeCardId(String stripeCardId) {
            this.stripeCardId = stripeCardId;
        }

        public String getStripeToken() {
            return stripeToken;
        }

        public void setStripeToken(String stripeToken) {
            this.stripeToken = stripeToken;
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
        private Payment payment;
        private Integer amount;
        private String stripeCardId;
        private String stripeRefundId;
        private String type;
        private QLUser.UserEntry user;

        public PaymentEntry(Payment payment) {
            super(payment);
            this.payment = payment;
            this.amount = payment.getAmount();
            this.type = payment.getType();
            this.stripeCardId = payment.getStripeCardId();
            this.stripeRefundId = payment.getStripeRefundId();
        }

        public String getType() {
            return type;
        }

        public QLUser.UserEntry getUser() {
            if (user == null) user = new QLUser.UserEntry(payment.getUser());
            return user;
        }

        public String getStripeCardId() {
            return stripeCardId;
        }

        public String getStripeRefundId() {
            return stripeRefundId;
        }

        public Integer getAmount() {
            return amount;
        }
    }
}
