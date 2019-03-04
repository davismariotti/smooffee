package actions;

import models.Card;
import models.Payment;
import models.Refund;
import models.User;
import utilities.QLException;

public class PaymentActions {

    public static Payment makeCashPayment(String userId, Integer amount) {
        User user = User.findByFirebaseUid(userId);
        if (user == null) throw new QLException("User not found");

        Payment payment = new Payment()
                .setAmount(amount)
                .setUser(user)
                .setType("cash")
                .store();

        UserActions.addToBalance(userId, amount);

        return payment;
    }

    public static Payment makeCardPayment(String userId, Integer amount, Long cardId) {
        User user = User.findByFirebaseUid(userId);
        if (user == null) throw new QLException("User not found");

        Card card = Card.find.byId(cardId);
        if (card == null) throw new QLException("Card not found");

        Payment payment = new Payment()
                .setAmount(amount)
                .setUser(user)
                .setType("card")
                .setCard(card)
                .store();

        UserActions.addToBalance(userId, amount);

        return payment;
    }

    public static Refund refundPayment(Long paymentId) {
        Payment payment = Payment.find.byId(paymentId);
        if (payment == null) throw new QLException("Payment not found");
        User user = payment.getUser();

        CardRefundActions.createCardRefund(payment.getCard().getId(), paymentId);

        return null;
    }
}
