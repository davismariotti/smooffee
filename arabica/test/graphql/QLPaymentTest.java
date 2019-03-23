package graphql;

import environment.FakeApplication;
import environment.Setup;
import helpers.QL;
import models.BaseModel;
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
                "query { payment { read(id: %d) { id amount type user { id balance } } } }",
                paymentId
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());
        QLPayment.PaymentEntry entry = FakeApplication.graphQLResultToObject(result, "payment/read", QLPayment.PaymentEntry.class);
        assertEquals(paymentId, entry.getId());
        assertEquals(600, entry.getAmount().intValue());
        assertEquals("cash", entry.getType());
        assertNotNull(entry.getUser());
        assertEquals(Setup.defaultSysadmin.getFirebaseUserId(), entry.getUser().getId());
    }


    public static QLPayment.PaymentEntry createPaymentCash(int amount) {
        QLPayment.PaymentInput input = new QLPayment.PaymentInput();
        input.setStatus(BaseModel.ACTIVE);
        input.setAmount(amount);
        input.setType("cash");

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { payment { create(userId: %s, paymentInput: %s) { id amount type user { id balance } } } }",
                QL.prepare(Setup.defaultSysadmin.getFirebaseUserId()),
                QL.prepare(input)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());
        QLPayment.PaymentEntry entry = FakeApplication.graphQLResultToObject(result, "payment/create", QLPayment.PaymentEntry.class);
        assertNotNull(entry.getId());
        assertEquals(amount, entry.getAmount().intValue());
        assertEquals("cash", entry.getType());
        assertNotNull(entry.getUser());
        assertEquals(Setup.defaultSysadmin.getFirebaseUserId(), entry.getUser().getId());

        return entry;
    }
}
