package graphql;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import environment.FakeApplication;
import environment.Setup;
import helpers.QL;
import models.BaseModel;
import org.junit.*;
import play.mvc.Result;

import java.io.IOException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static play.mvc.Http.Status.OK;
import static play.test.Helpers.contentAsString;

public class QLOrderTest {

    private static Long orderId;

    @BeforeClass
    public static void setup() {
        FakeApplication.start(true);
        Setup.createDefaultOrganization();
        Setup.createDefaultSysadmin();
        Setup.createDefaultProduct();

        createOrderTest();
    }

    @AfterClass
    public static void teardown() {
        FakeApplication.stop();
    }

    public static void createOrderTest() {
        QLPaymentTest.createPaymentCash(Setup.defaultProduct.getPrice());

        QLOrder.OrderInput orderInput = new QLOrder.OrderInput();
        orderInput.setStatus(BaseModel.ACTIVE);
        orderInput.setLocation("HUB");
        orderInput.setNotes("Notes");
        orderInput.setRecipient("Davis Mariotti");
        orderInput.setProductId(Setup.defaultProduct.getId());

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { order { create(userId: %s, orderInput: %s) { id location notes recipient product { id } } } }",
                QL.prepare(Setup.defaultSysadmin.getFirebaseUserId()),
                QL.prepare(orderInput)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLOrder.OrderEntry entry = FakeApplication.graphQLResultToObject(result, "order/create", QLOrder.OrderEntry.class);
        assertNotNull(entry);
        assertNotNull(entry.getId());
        orderId = entry.getId();

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
        assertNotNull(result);
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
        input.setStatus(BaseModel.ACTIVE);
        input.setProductId(Setup.defaultProduct.getId());

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { order { create(userId: %s, orderInput: %s) { id location notes product { id } } } }",
                QL.prepare(Setup.defaultSysadmin.getFirebaseUserId()),
                QL.prepare(input)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

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

    @Test
    public void readOrderTest() {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { order { read(id: %d) { id location notes product { id } status recipient } } }",
                orderId
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());
        QLOrder.OrderEntry entry = FakeApplication.graphQLResultToObject(result, "order/read", QLOrder.OrderEntry.class);
        assertNotNull(entry);
        assertEquals(orderId, entry.getId());
        assertEquals("HUB", entry.getLocation());
        assertEquals("Notes", entry.getNotes());
        assertEquals("Davis Mariotti", entry.getRecipient());
        assertEquals(Setup.defaultProduct.getId(), entry.getProduct().getId());
        assertEquals(BaseModel.ACTIVE, entry.getStatus().intValue());
    }

    @Test
    public void listOrdersTest() {
        QLPaymentTest.createPaymentCash(Setup.defaultProduct.getPrice());

        QLOrder.OrderInput orderInput = new QLOrder.OrderInput();
        orderInput.setLocation("EJ308");
        orderInput.setNotes("Other notes");
        orderInput.setRecipient("Tom Dale");
        orderInput.setStatus(BaseModel.ACTIVE);
        orderInput.setProductId(Setup.defaultProduct.getId());

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { order { create(userId: %s, orderInput: %s) { id location notes recipient product { id } } } }",
                QL.prepare(Setup.defaultSysadmin.getFirebaseUserId()),
                QL.prepare(orderInput)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        result = FakeApplication.routeGraphQLRequest(String.format(
                "query { order { list(organizationId: %d, statuses: %s) { id location notes product { id } status recipient } } }",
                Setup.defaultOrganization.getId(),
                QL.prepare(new Integer[]{1})
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLOrder.OrderEntry[] entries = FakeApplication.graphQLResultToObject(result, "order/list", QLOrder.OrderEntry[].class);
        assertNotNull(entries);
        assertEquals(2, entries.length);
        assertEquals(orderId, entries[0].getId());
        assertEquals("HUB", entries[0].getLocation());
        assertEquals("Notes", entries[0].getNotes());
        assertEquals("Davis Mariotti", entries[0].getRecipient());

        assertEquals("EJ308", entries[1].getLocation());
        assertEquals("Other notes", entries[1].getNotes());
        assertEquals("Tom Dale", entries[1].getRecipient());

    }
}
