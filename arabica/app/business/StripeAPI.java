package business;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Refund;
import models.Card;
import models.Organization;
import models.Payment;
import models.User;

import java.util.HashMap;
import java.util.Map;

public class StripeAPI {

    public static Charge chargeCard(Organization organization, Card card, Payment payment) {
        User cardUser = card.getUser();

        Stripe.apiKey = organization.getApiKey();

        Map<String, Object> params = new HashMap<>();
        params.put("amount", payment.getAmount());
        params.put("currency", "usd");
        params.put("description", String.format("Make payment for user %s %s (%s)", cardUser.getFirstname(), cardUser.getLastname(), cardUser.getFirebaseUserId()));
        params.put("receipt_email", cardUser.getEmail());
        params.put("source", card.getToken());
        params.put("statement_descriptor", "Smooffee Payment");
        try {
            return Charge.create(params);
        } catch (StripeException e) {
            e.printStackTrace(); // TODO Handle errors
            return null;
        }
    }

    public static Refund makeRefund(Payment payment) {
        Stripe.apiKey = payment.getUser().getOrganization().getApiKey();

        Map<String, Object> params = new HashMap<>();
        params.put("charge", payment.getStripeChargeId());
        try {
            return Refund.create(params);
        } catch (StripeException e) {
            e.printStackTrace();
            return null; // TODO Handle errors
        }
    }
}
