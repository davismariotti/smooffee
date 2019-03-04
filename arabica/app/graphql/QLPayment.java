package graphql;

import actions.PaymentActions;
import models.Payment;
import services.authorization.Permission;
import utilities.QLException;

public class QLPayment {
    public static class Query {
        public PaymentEntry read(Long id) {
            Permission.check(Permission.THIS_ORGANIZATION); // TODO
            Payment payment = Payment.find.byId(id);
            if (payment == null) {
                return null;
            }
            return new PaymentEntry(payment);
        }
    }

    public static class Mutation {
        public PaymentEntry create(String userId, PaymentInput paymentInput) {
            if (paymentInput.getType().equals("card")) {
                return new PaymentEntry(PaymentActions.makeCardPayment(userId, paymentInput.getAmount(), paymentInput.getCardId()));

            } else if (paymentInput.getType().equals("cash")) {
                return new PaymentEntry(PaymentActions.makeCashPayment(userId, paymentInput.getAmount()));
            } else throw new QLException("Type not valid");
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
        private String type;
        private QLUser.UserEntry user;

        public PaymentEntry(Payment payment) {
            this.id = payment.getId();
            this.amount = payment.getAmount();
            this.type = payment.getType();
            if (payment.getCard() != null) this.cardId = payment.getCard().getId();
            this.user = new QLUser.UserEntry(payment.getUser());
        }

        public String getType() {
            return type;
        }

        public QLUser.UserEntry getUser() {
            return user;
        }

        public Long getId() {
            return id;
        }

        public Long getCardId() {
            return cardId;
        }

        public Integer getAmount() {
            return amount;
        }
    }
}
