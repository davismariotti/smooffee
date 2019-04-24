package graphql;

import environment.FakeApplication;
import environment.Setup;
import helpers.QL;
import models.Payment;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import play.mvc.Result;
import services.AuthenticationService;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.*;
import static play.mvc.Http.Status.OK;

public class StripeTest {

    public static final String STRIPE_SECRET_KEY = "sk_test_O3XaPxAKEZc09IYK16pKr1FW00WluiPGqN";

    public static final String TOK_VISA = "tok_visa";
    public static final String TOK_AMEX = "tok_amex";
    public static final String TOK_MASTERCARD = "tok_mastercard";
    //    public static final String TOK_AVSFAIL = "tok_avsFail";
    public static final String TOK_CVC_CHECK_FAIL = "tok_cvcCheckFail";
    public static final String TOK_CHARGE_DECLINED_INSUFFICIENT_FUNDS = "tok_chargeDeclinedInsufficientFunds";
    public static final String TOK_CHARGE_DECLINED_FRAUDULENT = "tok_chargeDeclinedFraudulent";
    public static final String TOK_CHARGE_DECLINED_INCORRECT_CVC = "tok_chargeDeclinedIncorrectCvc";
    public static final String TOK_CHARGE_DECLINED_EXPIRED_CARD = "tok_chargeDeclinedExpiredCard";
    public static final String TOK_CHARGE_CUSTOMER_FAIL = "tok_chargeCustomerFail";

    public static final String[] failTokensOnAttach = {
            TOK_CHARGE_DECLINED_EXPIRED_CARD,
            TOK_CHARGE_DECLINED_INCORRECT_CVC,
            TOK_CHARGE_DECLINED_INSUFFICIENT_FUNDS,
            TOK_CVC_CHECK_FAIL
    };

    public static final String[] failTokensOnCharge = {
            TOK_CHARGE_CUSTOMER_FAIL,
            TOK_CHARGE_DECLINED_FRAUDULENT
    };

    @BeforeClass
    public static void setup() {
        FakeApplication.start(true);
        Setup.createDefaultOrganization();
        Setup.createDefaultSysadmin();
        Setup.createDefaultAdmin();
        Setup.createDefaultProduct();
        Setup.createDefaultDeliveryPeriod();

        Setup.defaultOrganization.setSecretApiKey(STRIPE_SECRET_KEY).save();
    }

    @AfterClass
    public static void teardown() {
        FakeApplication.stop();
    }

    @Test
    public void emptyCardsOnNewCustomerTest() {
        FakeApplication.authToken.push(getEmailUid(1));
        QLUser.UserInput input = new QLUser.UserInput();
        input.setFirstName("Stripe");
        input.setLastName("Dummy1");

        QLUser.UserEntry newCustomer = QLUserTest.createUser(input);

        List<QLUser.CardEntry> cardEntries = listCards(newCustomer.getId());
        assertEquals(0, cardEntries.size());

        FakeApplication.authToken.pop();
    }

    @Test
    public void attachCardTest() {
        FakeApplication.authToken.push(getEmailUid(2));
        QLUser.UserInput input = new QLUser.UserInput();
        input.setFirstName("Stripe");
        input.setLastName("Dummy2");

        QLUser.UserEntry newCustomer = QLUserTest.createUser(input);

        attachCard(newCustomer.getId(), TOK_VISA);
        attachCard(newCustomer.getId(), TOK_AMEX);
        attachCard(newCustomer.getId(), TOK_MASTERCARD);

        List<QLUser.CardEntry> entries = listCards(newCustomer.getId());
        assertEquals(3, entries.size());

        for (QLUser.CardEntry entry : entries) {
            assertNotNull(entry.getBrand());
            assertNotNull(entry.getStripeCardId());
            assertNotNull(entry.getLast4());
            assertTrue(entry.getStripeCardId().startsWith("card_"));
            assertEquals(29, entry.getStripeCardId().length());
            switch (entry.getBrand()) {
                case "Visa":
                    assertEquals("4242", entry.getLast4());
                    break;
                case "MasterCard":
                    assertEquals("4444", entry.getLast4());
                    break;
                case "American Express":
                    assertEquals("8431", entry.getLast4());
                    break;
                default:
                    fail();
            }
        }

        FakeApplication.authToken.pop();
    }

    @Test
    public void attachCardFailTest() {
        String uid = getEmailUid(4);
        FakeApplication.authToken.push(uid);
        QLUser.UserInput input = new QLUser.UserInput();
        input.setFirstName("Stripe");
        input.setLastName("Dummy4");

        QLUser.UserEntry newCustomer = QLUserTest.createUser(input);

        for (String token : failTokensOnAttach) {
            Result result = FakeApplication.routeGraphQLRequest(String.format(
                    "mutation { user { attachCard(userId: %s, stripeToken: %s) { stripeCardId brand last4 } } }",
                    QL.prepare(uid),
                    QL.prepare(token)
            ));
            assertNotNull(result);
            assertEquals(OK, result.status());

            FakeApplication.assertErrorMessageEquals("Exception while fetching data (/user/attachCard) : null", result);
        }

    }

    @Test
    public void chargeCardSuccessfulTest() {
        String uid = getEmailUid(3);
        FakeApplication.authToken.push(uid);
        QLUser.UserInput input = new QLUser.UserInput();
        input.setFirstName("Stripe");
        input.setLastName("Dummy3");

        QLUser.UserEntry newCustomer = QLUserTest.createUser(input);

        QLUser.CardEntry cardEntry = attachCard(newCustomer.getId(), TOK_VISA);

        QLPayment.PaymentEntry paymentEntry = QLPaymentTest.createPaymentCard(uid, 500, cardEntry.getStripeCardId());
        assertEquals(cardEntry.getStripeCardId(), paymentEntry.getStripeCardId());

        FakeApplication.authToken.pop();
    }

    @Test
    public void refundStripePaymentTest() {
        String uid = getEmailUid(6);
        FakeApplication.authToken.push(uid);
        QLUser.UserInput input = new QLUser.UserInput();
        input.setFirstName("Stripe");
        input.setLastName("Dummy6");

        QLUserTest.createUser(input);

        QLUser.CardEntry cardEntry = attachCard(uid, TOK_VISA);
        QLPayment.PaymentEntry paymentEntry = QLPaymentTest.createPaymentCard(uid, 500, cardEntry.getStripeCardId());
        assertNotNull(paymentEntry.getStripeCardId());
        assertEquals(cardEntry.getStripeCardId(), paymentEntry.getStripeCardId());

        FakeApplication.authToken.push(Setup.defaultAdmin.getFirebaseUserId());
        QLPayment.PaymentEntry refundedEntry = QLPaymentTest.createRefund(paymentEntry.getId());
        assertNotNull(refundedEntry.getStripeRefundId());
        assertTrue(refundedEntry.getStripeRefundId().startsWith("re_"));
        assertEquals(27, refundedEntry.getStripeRefundId().length());

        FakeApplication.authToken.pop();
        FakeApplication.authToken.pop();
    }

    @Test
    public void chargeFailTest() {
        String uid = getEmailUid(5);

        FakeApplication.authToken.push(uid);
        QLUser.UserInput input = new QLUser.UserInput();
        input.setFirstName("Stripe");
        input.setLastName("Dummy5");

        QLUserTest.createUser(input);

        for (String token : failTokensOnCharge) {
            QLUser.CardEntry cardEntry = attachCard(uid, token);

            QLPayment.PaymentInput paymentInput = new QLPayment.PaymentInput();
            paymentInput.setAmount(500);
            paymentInput.setType(Payment.CARD);
            paymentInput.setStripeCardId(cardEntry.getStripeCardId());

            Result result = FakeApplication.routeGraphQLRequest(String.format(
                    "mutation { payment { create(userId: %s, paymentInput: %s) { id amount type user { id balance } stripeCardId } } }",
                    QL.prepare(uid),
                    QL.prepare(paymentInput)
            ));

            FakeApplication.assertErrorMessageEquals("Exception while fetching data (/payment/create) : null", result, "card_declined");
        }

        FakeApplication.authToken.pop();
    }

    public QLUser.CardEntry attachCard(String userId, String stripeToken) {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { user { attachCard(userId: %s, stripeToken: %s) { stripeCardId brand last4 } } }",
                QL.prepare(userId),
                QL.prepare(stripeToken)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLUser.CardEntry entry = FakeApplication.graphQLResultToObject(result, "user/attachCard", QLUser.CardEntry.class);
        assertNotNull(entry);
        assertNotNull(entry.getBrand());
        assertNotNull(entry.getStripeCardId());
        assertNotNull(entry.getLast4());
        assertTrue(entry.getStripeCardId().startsWith("card_"));
        assertEquals(29, entry.getStripeCardId().length());
        return entry;
    }

    public List<QLUser.CardEntry> listCards(String userId) {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { user { listCards(userId: %s) { stripeCardId brand last4 } } }",
                QL.prepare(userId)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLUser.CardEntry[] entries = FakeApplication.graphQLResultToObject(result, "user/listCards", QLUser.CardEntry[].class);
        assertNotNull(entries);

        return Arrays.stream(entries).collect(Collectors.toList());
    }

    public static String getEmailUid(int idx) {
        String uid = String.format("stripedummy%d@test.com", idx);
        AuthenticationService.mockMap.put(uid, uid);
        return uid;
    }
}
