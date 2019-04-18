package business;

import com.stripe.exception.StripeException;
import com.stripe.model.Card;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import com.stripe.model.Refund;
import com.stripe.net.RequestOptions;
import com.stripe.net.RequestOptions.RequestOptionsBuilder;
import models.User;
import utilities.ThreadStorage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class StripeAPI {

    public static RequestOptions options() {
        User callingUser = User.findByFirebaseUid(ThreadStorage.get().uid);
        if (callingUser == null) throw new RuntimeException("Attempt was made to use Stripe with no calling user");
        return new RequestOptionsBuilder().setApiKey(callingUser.getOrganization().getSecretApiKey()).build();
    }

    // Customer
    public static Customer createCustomer(User user, String cardToken) throws StripeException {
        if (user == null || cardToken == null) return null;
        Map<String, Object> customerParams = new HashMap<>();
        customerParams.put("description", String.format("%s %s (%s)", user.getFirstName(), user.getLastName(), user.getEmail()));
        customerParams.put("source", cardToken);
        return Customer.create(customerParams, options());
    }



    public static Customer retrieveCustomer(User user) throws StripeException {
        if (user == null || user.getStripeCustomerId() == null) return null;

        return Customer.retrieve(user.getStripeCustomerId(), options());
    }

    // Card
    public static Card addCardToCustomer(User user, String cardToken) throws StripeException {
        if (user == null || cardToken == null) return null;
        Customer customer = retrieveCustomer(user);
        if (customer == null) return null;

        Map<String, Object> params = new HashMap<>();
        params.put("source", cardToken);
        return (Card) customer.getSources().create(params, options());
    }

    public static List<Card> listCards(User user) throws StripeException {
        if (user == null) return null;

        Customer customer = retrieveCustomer(user);
        if (customer == null) return null;

        Map<String, Object> cardParams = new HashMap<>();
        cardParams.put("object", "card");
        return customer.getSources().list(cardParams, options()).getData().stream().map(card -> (Card) card).collect(Collectors.toList());
    }

    public static Card retrieveCard(User user, String stripeCardId) throws StripeException {
        if (user == null || user.getStripeCustomerId() == null || stripeCardId == null) return null;
        Customer customer = retrieveCustomer(user);
        if (customer == null) return null;

        return (Card) customer.getSources().retrieve(stripeCardId, options());
    }

    // Charge
    public static Charge createChargeFromToken(User user, Integer amount, String token) throws StripeException {
        if (user == null || token == null || amount == null) return null;

        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", amount);
        chargeParams.put("currency", "usd");
        chargeParams.put("description", String.format("Payment for user %s %s (%s)", user.getFirstName(), user.getLastName(), user.getEmail()));
        chargeParams.put("source", token);
        chargeParams.put("receipt_email", user.getEmail());
        chargeParams.put("statement_descriptor", "Smooffee Payment");

        return Charge.create(chargeParams, options());
    }

    public static Charge createChargeFromCustomer(User user, Integer amount, String stripeCardId) throws StripeException {
        if (user == null || amount == null) return null;

        // Charge the Customer instead of the card:
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", amount);
        chargeParams.put("currency", "usd");
        chargeParams.put("customer", user.getStripeCustomerId());
        chargeParams.put("description", String.format("Payment for user %s %s (%s)", user.getFirstName(), user.getLastName(), user.getEmail()));
        chargeParams.put("receipt_email", user.getEmail());
        chargeParams.put("statement_descriptor", "Smooffee Payment");
        if (stripeCardId != null) {
            chargeParams.put("source", stripeCardId);
        }

        return Charge.create(chargeParams, options());
    }

    public static Refund makeRefund(User user, String stripeChargeId) throws StripeException {
        if (user == null || stripeChargeId == null) return null;

        Map<String, Object> params = new HashMap<>();
        params.put("charge", stripeChargeId);
        return Refund.create(params, options());
    }

    public static Refund makeRefund(User user, String stripeChargeId, Integer amount) throws StripeException {
        if (user == null || stripeChargeId == null) return null;

        Map<String, Object> params = new HashMap<>();
        params.put("charge", stripeChargeId);
        params.put("amount", amount);
        params.put("reason", "requested_by_customer");

        return Refund.create(params, options());
    }
}
