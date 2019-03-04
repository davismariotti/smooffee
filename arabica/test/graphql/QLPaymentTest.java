package graphql;

import environment.FakeApplication;
import environment.Setup;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import play.mvc.Result;
import services.AuthenticationService;

import static org.junit.Assert.*;
import static play.mvc.Http.Status.OK;

public class QLPaymentTest {

    @Before
    public void setup() {
        FakeApplication.start(true);
        Setup.createDefaultOrganization();
        Setup.createDefaultSysadmin();
        AuthenticationService.mockMap.put("test2@test.com", "test2@test.com");
    }

    @After
    public void teardown() {
        FakeApplication.stop();
    }

    @Test
    public void createPaymentCashTest() {
        Result result = FakeApplication.routeGraphQLRequest(String.format("mutation { payment { create(userId: \\\"%s\\\", paymentInput: { type: \\\"cash\\\", amount: 600 }) { id amount type user { id balance } } } }", Setup.defaultSysadmin.getFirebaseUserId()));
        assertEquals(OK, result.status());
        QLPayment.PaymentEntry entry = FakeApplication.graphQLResultToObject(result, "payment/create", QLPayment.PaymentEntry.class);
        assertNotNull(entry.getId());
        assertEquals(600, entry.getAmount().intValue());
        assertEquals("cash", entry.getType());
        assertNotNull(entry.getUser());
        assertEquals(Setup.defaultSysadmin.getFirebaseUserId(), entry.getUser().getId());
        assertEquals(600, entry.getUser().getBalance().intValue());
    }
}
