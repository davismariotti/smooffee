package actions;

import models.*;
import utilities.QLException;

public class CardRefundActions {

    public static CardRefund createCardRefund(Payment payment) {
        if (payment == null) return null;

        CardRefund cardRefund = new CardRefund()
                .setCard(payment.getCard())
                .setPayment(payment)
                .setStatus(BaseModel.ACTIVE)
                .store();

        // TODO Stripe Refund card
        // TODO Check user balance
        UserActions.removeFromBalance(payment.getUser(), payment.getAmount()); // TODO Allow free refund

        return cardRefund;
    }
}
