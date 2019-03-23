package actions;

import com.stripe.model.Refund;
import models.BaseModel;
import models.CardRefund;
import models.Payment;

public class CardRefundActions {

    public static CardRefund createCardRefund(Payment payment, Refund stripeRefund) {
        if (payment == null || stripeRefund == null) return null;

        CardRefund cardRefund = new CardRefund()
                .setCard(payment.getCard())
                .setStripeRefundId(stripeRefund.getId())
                .setPayment(payment)
                .setStatus(BaseModel.ACTIVE)
                .store();

        payment.setCardRefund(cardRefund).save();

        // TODO Stripe Refund card
        // TODO Check user balance
        UserActions.removeFromBalance(payment.getUser(), payment.getAmount()); // TODO Allow free refund

        return cardRefund;
    }
}
