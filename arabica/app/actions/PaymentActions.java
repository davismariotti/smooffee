package actions;

import business.StripeAPI;
import com.stripe.model.Charge;
import com.stripe.model.Refund;
import models.BaseModel;
import models.Card;
import models.Payment;
import models.User;

public class PaymentActions {

    public static Payment makeCashPayment(User user, Integer amount) {
        if (user == null || amount == null) return null;

        Payment payment = new Payment()
                .setAmount(amount)
                .setUser(user)
                .setType("cash")
                .setStatus(BaseModel.ACTIVE)
                .store();

        UserActions.addToBalance(user, amount);
        payment.refresh();

        return payment;
    }

    public static Payment makeCardPayment(User user, Card card, Integer amount) {
        if (user == null || card == null || amount == null) return null;

        Payment payment = new Payment()
                .setAmount(amount)
                .setUser(user)
                .setType("card")
                .setCard(card)
                .setStatus(BaseModel.ACTIVE);

        Charge charge = StripeAPI.chargeCard(user.getOrganization(), card, payment);
        payment.setStripeChargeId(charge.getId()); // TODO handle errors

        payment.save();
        UserActions.addToBalance(user, amount);

        return payment;
    }

    public static Payment refundPayment(Payment payment) {
        if (payment == null) return null;

        if (payment.getType().equals("cash")) {
            return payment.setStatus(BaseModel.REFUNDED).store();
        } else if (payment.getType().equals("card")) {
            Refund refund = StripeAPI.makeRefund(payment);
            payment.setCardRefund(CardRefundActions.createCardRefund(payment, refund)).save();
            return payment;
        } else {
            return null;
        }
    }
}
