package graphql;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import environment.FakeApplication;
import environment.Setup;
import helpers.QL;
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
        QLPayment.PaymentInput paymentInput = new QLPayment.PaymentInput();
        paymentInput.setAmount(Setup.defaultProduct.getPrice());
        paymentInput.setType("cash");

        // Add funds to user
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { payment { create(userId: %s, paymentInput: %s) { id amount }} }",
                QL.prepare(Setup.defaultSysadmin.getFirebaseUserId()),
                QL.prepare(paymentInput)
        ));
        assertEquals(OK, result.status());

        QLOrder.OrderInput orderInput = new QLOrder.OrderInput();
        orderInput.setLocation("HUB");
        orderInput.setNotes("Notes");
        orderInput.setRecipient("Davis Mariotti");
        orderInput.setProductId(Setup.defaultProduct.getId());

        result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { order { create(userId: %s, orderInput: %s) { id location notes recipient product { id } } } }",
                QL.prepare(Setup.defaultSysadmin.getFirebaseUserId()),
                QL.prepare(orderInput)
        ));
        assertEquals(OK, result.status());

        QLOrder.OrderEntry entry = FakeApplication.graphQLResultToObject(result, "order/create", QLOrder.OrderEntry.class);
        assertNotNull(entry);
        assertNotNull(entry.getId());
        assertEquals("Notes", entry.getNotes());
        assertEquals("HUB", entry.getLocation());
        assertEquals("Davis Mariotti", entry.getRecipient());
        assertNotNull(entry.getProduct());
        assertEquals(Setup.defaultProduct.getId(), entry.getProduct().getId());

        // Make sure funds were deducted
        result = FakeApplication.routeGraphQLRequest(String.format(
                "query { user { read(id: %s) { id balance } } }",
                QL.prepare(Setup.defaultSysadmin.getFirebaseUserId())

        ));
        assertEquals(OK, result.status());
        QLUser.UserEntry userEntry = FakeApplication.graphQLResultToObject(result, "user/read", QLUser.UserEntry.class);
        assertNotNull(userEntry);
        assertNotNull(userEntry.getId());
        assertEquals(0, userEntry.getBalance().intValue());
    }

    @Test
    public void createOrderInsufficientFunds() {
        QLOrder.OrderInput input = new QLOrder.OrderInput();
        input.setLocation("HUB");
        input.setNotes("Notes");
        input.setRecipient("Davis Mariotti");
        input.setProductId(Setup.defaultProduct.getId());

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { order { create(userId: %s, orderInput: %s) { id location notes product { id } } } }",
                QL.prepare(Setup.defaultSysadmin.getFirebaseUserId()),
                QL.prepare(input)
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
