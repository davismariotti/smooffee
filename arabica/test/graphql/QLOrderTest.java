package graphql;

import environment.FakeApplication;
import environment.Setup;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import play.mvc.Result;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static play.mvc.Http.Status.OK;

public class QLOrderTest {

    @Before
    public void setup() {
        FakeApplication.start(true);
        Setup.createDefaultOrganization();
        Setup.createDefaultSysadmin();
        Setup.createDefaultProduct();
    }

    @After
    public void teardown() {
        FakeApplication.stop();
    }

    @Test
    public void createOrderTest() {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { order { create(userId: \\\"%s\\\", orderInput: { location: \\\"HUB\\\", notes: \\\"Notes\\\", productId: %d }) { id location notes product { id } } } }",
                Setup.defaultSysadmin.getFirebaseUserId(),
                Setup.defaultProduct.getId()
        ));
        assertEquals(OK, result.status());

        QLOrder.OrderEntry entry = FakeApplication.graphQLResultToObject(result, "order/create", QLOrder.OrderEntry.class);
        assertNotNull(entry.getId());
        assertEquals("Notes", entry.getNotes());
        assertEquals("HUB", entry.getLocation());
        assertNotNull(entry.getProduct());
        assertEquals(Setup.defaultProduct.getId(), entry.getProduct().getId());
    }
}
