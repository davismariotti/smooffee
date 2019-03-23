package actions;

import business.StripeAPI;
import com.stripe.model.Charge;
import com.stripe.model.Refund;
import models.BaseModel;
import models.Card;
import models.Payment;
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
                .setStatus(BaseModel.ACTIVE)
                .store();

        UserActions.addToBalance(userId, amount);
        payment.refresh();

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
                .setStatus(BaseModel.ACTIVE);

        Charge charge = StripeAPI.chargeCard(user.getOrganization(), card, payment);
        payment.setStripeChargeId(charge.getId()); // TODO handle errors

        payment.save();
        UserActions.addToBalance(userId, amount);

        return payment;
    }

    public static Payment refundPayment(Long paymentId) {
        Payment payment = Payment.find.byId(paymentId);
        if (payment == null) throw new QLException("Payment not found");

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
