package actions;

import business.StripeAPI;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Refund;
import models.BaseModel;
import models.Payment;
import models.User;
import utilities.QLException;

public class PaymentActions {

    public static Payment makeCashPayment(User user, Integer amount) {
        if (user == null || amount == null) return null;

        Payment payment = new Payment()
                .setAmount(amount)
                .setUser(user)
                .setType(Payment.CASH)
                .setStatus(BaseModel.ACTIVE);

        UserActions.addToBalance(user, amount);

        payment.save();

        return payment;
    }

    public static Payment makeCardPayment(User user, Integer amount, String stripeCardId) {
        if (user == null || amount == null) return null;

        Payment payment = new Payment()
                .setAmount(amount)
                .setUser(user)
                .setType(Payment.CARD)
                .setStatus(BaseModel.ACTIVE);

        try {
            Charge charge = StripeAPI.createChargeFromCustomer(user, amount, stripeCardId);
            payment.setStripeChargeId(charge.getId());
        } catch (StripeException e) {
            throw new QLException(e);
        }

        UserActions.addToBalance(user, amount);

        payment.save();

        return payment;
    }

    public static Payment makeOneOffCardPayment(User user, Integer amount, String token) {
        if (user == null || amount == null || token == null) return null;

        Payment payment = new Payment()
                .setAmount(amount)
                .setUser(user)
                .setType(Payment.CARD)
                .setStatus(BaseModel.ACTIVE);

        try {
            Charge charge = StripeAPI.createChargeFromToken(user, amount, token);
            payment.setStripeChargeId(charge.getId());
        } catch (StripeException e) {
            throw new QLException(e);
        }
        
        UserActions.addToBalance(user, amount);

        payment.save();

        return payment;
    }

    public static Payment refundPayment(Payment payment) {
        if (payment == null) return null;

        if (payment.getType().equals(Payment.CARD)) {
            try {
                Refund refund = StripeAPI.makeRefund(payment.getUser(), payment.getStripeChargeId());
                return payment.setStripeRefundId(refund.getId()).store();
            } catch (StripeException e) {
                throw new QLException(e);
            }
        } else { // CASH
            return payment.setStatus(BaseModel.REFUNDED).store();
        }
    }
}
