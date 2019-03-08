package graphql;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import environment.FakeApplication;
import environment.Setup;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import play.mvc.Result;

import java.io.IOException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static play.mvc.Http.Status.OK;
import static play.test.Helpers.contentAsString;

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
        // Add funds to user
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { payment { create(userId: \\\"%s\\\", paymentInput: { type: \\\"cash\\\", amount: %d }) { id amount }} }",
                Setup.defaultSysadmin.getFirebaseUserId(),
                Setup.defaultProduct.getPrice()
        ));
        assertEquals(OK, result.status());

        result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { order { create(userId: \\\"%s\\\", orderInput: { location: \\\"HUB\\\", notes: \\\"Notes\\\", productId: %d }) { id location notes product { id } } } }",
                Setup.defaultSysadmin.getFirebaseUserId(),
                Setup.defaultProduct.getId()
        ));
        assertEquals(OK, result.status());

        QLOrder.OrderEntry entry = FakeApplication.graphQLResultToObject(result, "order/create", QLOrder.OrderEntry.class);
        assertNotNull(entry);
        assertNotNull(entry.getId());
        assertEquals("Notes", entry.getNotes());
        assertEquals("HUB", entry.getLocation());
        assertNotNull(entry.getProduct());
        assertEquals(Setup.defaultProduct.getId(), entry.getProduct().getId());

        // Make sure funds were deducted
        result = FakeApplication.routeGraphQLRequest(String.format(
                "query { user { read(id: \\\"%s\\\") { id balance } } }",
                Setup.defaultSysadmin.getFirebaseUserId()

        ));
        assertEquals(OK, result.status());
        QLUser.UserEntry userEntry = FakeApplication.graphQLResultToObject(result, "user/read", QLUser.UserEntry.class);
        assertNotNull(userEntry);
        assertNotNull(userEntry.getId());
        assertEquals(0, userEntry.getBalance().intValue());
    }

    @Test
    public void createOrderInsufficientFunds() {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { order { create(userId: \\\"%s\\\", orderInput: { location: \\\"HUB\\\", notes: \\\"Notes\\\", productId: %d }) { id location notes product { id } } } }",
                Setup.defaultSysadmin.getFirebaseUserId(),
                Setup.defaultProduct.getId()
        ));
        assertEquals(OK, result.status());

        assertNotNull(result);

        try {
            JsonNode node = new ObjectMapper().readValue(contentAsString(result), ObjectNode.class).get("errors");
            assertNotNull(node);
            assertNotNull(node.get(0));
            assertNotNull(node.get(0).get("message"));
            assertEquals("\"Exception while fetching data (/order/create) : Insufficient funds\"", node.get(0).get("message").toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
