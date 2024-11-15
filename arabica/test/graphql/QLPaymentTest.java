package graphql;

import environment.FakeApplication;
import environment.Setup;
import helpers.QL;
import models.BaseModel;
import models.Payment;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import play.mvc.Result;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static play.mvc.Http.Status.OK;

public class QLPaymentTest {

    private static Long paymentId;

    @BeforeClass
    public static void setup() {
        FakeApplication.start(true);
        Setup.createDefaultOrganization();
        Setup.createDefaultSysadmin();
        createPaymentCashTest();
    }

    @AfterClass
    public static void teardown() {
        FakeApplication.stop();
    }

    public static void createPaymentCashTest() {
        QLPayment.PaymentEntry paymentEntry = createPaymentCash(600);
        paymentId = paymentEntry.getId();

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { user { read(id: %s) { id balance } } }",
                QL.prepare(Setup.defaultSysadmin.getFirebaseUserId())
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLUser.UserEntry entry = FakeApplication.graphQLResultToObject(result, "user/read", QLUser.UserEntry.class);
        assertNotNull(entry);
        assertEquals(600, entry.getBalance().intValue());
    }

    @Test
    public void readPaymentTest() {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { payment { read(id: %d) { id amount type status user { id balance } } } }",
                paymentId
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());
        QLPayment.PaymentEntry entry = FakeApplication.graphQLResultToObject(result, "payment/read", QLPayment.PaymentEntry.class);
        assertEquals(paymentId, entry.getId());
        assertEquals(BaseModel.COMPLETED_STR, entry.getStatus());
        assertEquals(600, entry.getAmount().intValue());
        assertEquals("cash", entry.getType());
        assertNotNull(entry.getUser());
        assertEquals(Setup.defaultSysadmin.getFirebaseUserId(), entry.getUser().getId());
    }

    public static QLPayment.PaymentEntry createPaymentCash(int amount) {
        return createPaymentCash(Setup.defaultSysadmin.getFirebaseUserId(), amount);
    }

    public static QLPayment.PaymentEntry createPaymentCash(String userId, int amount) {
        return createPayment(userId, amount, Payment.CASH, null);
    }

    public static QLPayment.PaymentEntry createPaymentCard(String userId, int amount, String stripeCardId) {
        return createPayment(userId, amount, Payment.CARD, stripeCardId);
    }

    public static QLPayment.PaymentEntry createPayment(String userId, int amount, String type, String stripeCardId) {
        QLPayment.PaymentInput input = new QLPayment.PaymentInput();
        input.setAmount(amount);
        input.setType(type);
        if (stripeCardId != null) {
            input.setStripeCardId(stripeCardId);
        }

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { payment { create(userId: %s, paymentInput: %s) { id amount type status user { id balance } stripeCardId } } }",
                QL.prepare(userId),
                QL.prepare(input)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());
        QLPayment.PaymentEntry entry = FakeApplication.graphQLResultToObject(result, "payment/create", QLPayment.PaymentEntry.class);
        assertNotNull(entry.getId());
        assertEquals(BaseModel.COMPLETED_STR, entry.getStatus());
        assertEquals(amount, entry.getAmount().intValue());
        assertEquals(type, entry.getType());
        assertNotNull(entry.getUser());
        assertEquals(userId, entry.getUser().getId());

        return entry;
    }

    public static QLPayment.PaymentEntry createRefund(Long paymentId) {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { payment { refundPayment(paymentId: %d) { id status amount user { id } stripeCardId stripeRefundId type } } }",
                paymentId
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLPayment.PaymentEntry entry = FakeApplication.graphQLResultToObject(result, "payment/refundPayment", QLPayment.PaymentEntry.class);
        assertNotNull(entry);
        assertEquals(paymentId, entry.getId());
        assertEquals(BaseModel.REFUNDED_STR, entry.getStatus());

        return entry;
    }
}
