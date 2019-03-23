package business;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import models.Card;
import models.Organization;
import models.Payment;

import java.util.HashMap;
import java.util.Map;

public class StripeAPI {

    public static Charge chargeCard(Organization organization, Card card, Payment payment) {
        Stripe.apiKey = organization.getApiKey();

        Map<String, Object> params = new HashMap<>();
        params.put("amount", payment.getAmount());
        params.put("currency", "usd");
        params.put("description", "Load account");
        params.put("source", card.getToken());
        try {
            return Charge.create(params);
        } catch (StripeException e) {
            e.printStackTrace(); // TODO Handle errors
            return null;
        }
    }
}
