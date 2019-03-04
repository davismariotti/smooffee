package actions;


import models.Card;
import models.CardRefund;
import models.Payment;
import utilities.QLException;

public class CardRefundActions {

    public static CardRefund createCardRefund(Long cardId, Long paymentId) {
        Card card = Card.find.byId(cardId);
        Payment payment = Payment.find.byId(paymentId);

        if (card == null) throw new QLException("Card not found");
        if (payment == null) throw new QLException("Payment not found");

        CardRefund cardRefund = new CardRefund()
                .setCard(card)
                .setPayment(payment)
                .store();

        // TODO Stripe Refund card
        // TODO Check user balance
        UserActions.removeFromBalance(payment.getUser().getFirebaseUserId(), payment.getAmount());

        return cardRefund;
    }
}
