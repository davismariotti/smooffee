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

import static org.junit.Assert.*;
import static play.mvc.Http.Status.OK;
import static play.test.Helpers.contentAsString;

public class QLOrderTest {

    private static Long orderId;

    @BeforeClass
    public static void setup() {
        FakeApplication.start(true);
        Setup.createDefaultOrganization();
        Setup.createDefaultDeliveryPeriod();
        Setup.createDefaultSysadmin();
        Setup.createDefaultCustomer();
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
        orderInput.setLocation("HUB");
        orderInput.setNotes("Notes");
        orderInput.setRecipient("Davis Mariotti");
        orderInput.setDeliveryPeriodId(Setup.defaultDeliveryPeriod.getId());
        orderInput.setProductId(Setup.defaultProduct.getId());

        QLOrder.OrderEntry entry = createOrder(orderInput);
        orderId = entry.getId();

        assertEquals("Notes", entry.getNotes());
        assertEquals("HUB", entry.getLocation());
        assertEquals("Davis Mariotti", entry.getRecipient());
        assertNotNull(entry.getProduct());
        assertNotNull(entry.getDeliveryPeriod());
        assertEquals(Setup.defaultProduct.getId(), entry.getProduct().getId());
        assertEquals(Setup.defaultDeliveryPeriod.getId(), entry.getDeliveryPeriod().getId());

        // Make sure funds were deducted
        Result result = FakeApplication.routeGraphQLRequest(String.format(
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
        QLOrder.OrderInput orderInput = new QLOrder.OrderInput();
        orderInput.setLocation("HUB");
        orderInput.setNotes("Notes");
        orderInput.setRecipient("Davis Mariotti");
        orderInput.setDeliveryPeriodId(Setup.defaultDeliveryPeriod.getId());
        orderInput.setProductId(Setup.defaultProduct.getId());

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { order { create(userId: %s, orderInput: %s) { id location notes product { id } } } }",
                QL.prepare(Setup.defaultSysadmin.getFirebaseUserId()),
                QL.prepare(orderInput)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        assertErrorMessageEquals("Exception while fetching data (/order/create) : Insufficient funds", result);
    }

    @Test
    public void readOrderTest() {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { order { read(id: %d) { id location notes product { id } deliveryPeriod { id classPeriod } status recipient } } }",
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
        assertNotNull(entry.getProduct());
        assertNotNull(entry.getDeliveryPeriod());
        assertEquals(Setup.defaultProduct.getId(), entry.getProduct().getId());
        assertEquals(Setup.defaultDeliveryPeriod.getId(), entry.getDeliveryPeriod().getId());
        assertEquals(BaseModel.ACTIVE, entry.getStatus().intValue());
    }

    @Test
    public void listOrdersTest() {
        QLPaymentTest.createPaymentCash(Setup.defaultProduct.getPrice());

        QLOrder.OrderInput orderInput = new QLOrder.OrderInput();
        orderInput.setLocation("EJ308");
        orderInput.setNotes("Other notes");
        orderInput.setRecipient("Tom Dale");
        orderInput.setDeliveryPeriodId(Setup.defaultDeliveryPeriod.getId());
        orderInput.setProductId(Setup.defaultProduct.getId());

        createOrder(orderInput);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { order { list(organizationId: %d, parameters: { filter: { eq: { field: \\\"status\\\", value: \\\"1\\\" } } }) { id location notes product { id } status recipient } } }",
                Setup.defaultOrganization.getId()
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

    @Test
    public void cancelActiveOrderTest() {
        QLPaymentTest.createPaymentCash(Setup.defaultCustomer.getFirebaseUserId(), Setup.defaultProduct.getPrice());
        FakeApplication.authToken.push(Setup.defaultCustomer.getFirebaseUserId());
        QLOrder.OrderInput orderInput = new QLOrder.OrderInput();
        orderInput.setLocation("EJ308");
        orderInput.setNotes("Other notes");
        orderInput.setRecipient("Tom Dale");
        orderInput.setDeliveryPeriodId(Setup.defaultDeliveryPeriod.getId());
        orderInput.setProductId(Setup.defaultProduct.getId());

        QLOrder.OrderEntry entry = createOrder(Setup.defaultCustomer.getFirebaseUserId(), orderInput);

        // Cancel order
        updateOrderStatus(entry.getId(), BaseModel.CANCELLED);

        FakeApplication.authToken.pop();
    }

    @Test
    public void cancelInProgressOrderTest() {
        QLPaymentTest.createPaymentCash(Setup.defaultCustomer.getFirebaseUserId(), Setup.defaultProduct.getPrice());
        FakeApplication.authToken.push(Setup.defaultCustomer.getFirebaseUserId());
        QLOrder.OrderInput orderInput = new QLOrder.OrderInput();
        orderInput.setLocation("EJ308");
        orderInput.setNotes("Other notes");
        orderInput.setRecipient("Tom Dale");
        orderInput.setDeliveryPeriodId(Setup.defaultDeliveryPeriod.getId());
        orderInput.setProductId(Setup.defaultProduct.getId());

        QLOrder.OrderEntry entry = createOrder(Setup.defaultCustomer.getFirebaseUserId(), orderInput);

        String tempToken = FakeApplication.authToken.pop();

        // Start order
        updateOrderStatus(entry.getId(), BaseModel.IN_PROGRESS);
        FakeApplication.authToken.push(tempToken);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { order { updateStatus(orderId: %d, status: %d) { id status } } }",
                entry.getId(),
                BaseModel.CANCELLED
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());
        assertErrorMessageEquals("Exception while fetching data (/order/updateStatus) : Order cannot be cancelled at this time.", result);

        FakeApplication.authToken.pop();
    }

    @Test
    public void refundOrder() {
        QLPaymentTest.createPaymentCash(Setup.defaultProduct.getPrice());
        QLOrder.OrderInput orderInput = new QLOrder.OrderInput();
        orderInput.setLocation("HUB");
        orderInput.setNotes("Notes");
        orderInput.setRecipient("Davis Mariotti");
        orderInput.setDeliveryPeriodId(Setup.defaultDeliveryPeriod.getId());
        orderInput.setProductId(Setup.defaultProduct.getId());
        QLOrder.OrderEntry entry = createOrder(orderInput);

        // Update to completed
        updateOrderStatus(entry.getId(), BaseModel.IN_PROGRESS);
        updateOrderStatus(entry.getId(), BaseModel.COMPLETED);

        // Refund order
        QLOrder.RefundEntry refundEntry = refundOrder(entry.getId());
        assertEquals(Setup.defaultProduct.getPrice(), refundEntry.getAmount().intValue());

        Setup.defaultSysadmin.refresh();
        Setup.defaultSysadmin.setBalance(0).store();
    }

    public static QLOrder.OrderEntry createOrder(QLOrder.OrderInput input) {
        return createOrder(Setup.defaultSysadmin.getFirebaseUserId(), input);
    }

    public static QLOrder.OrderEntry createOrder(String userId, QLOrder.OrderInput input) {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { order { create(userId: %s, orderInput: %s) { id location notes recipient status product { id } deliveryPeriod { id } } } }",
                QL.prepare(userId),
                QL.prepare(input)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLOrder.OrderEntry entry = FakeApplication.graphQLResultToObject(result, "order/create", QLOrder.OrderEntry.class);
        assertNotNull(entry);
        assertNotNull(entry.getId());
        assertEquals(input.getLocation(), entry.getLocation());
        assertEquals(input.getRecipient(), entry.getRecipient());
        assertEquals(input.getNotes(), entry.getNotes());
        assertEquals(input.getProductId(), entry.getProduct().getId());
        assertEquals(BaseModel.ACTIVE, entry.getStatus().intValue());

        return entry;
    }

    public static QLOrder.OrderEntry updateOrderStatus(Long orderId, Integer status) {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { order { updateStatus(orderId: %d, status: %d) { id status } } }",
                orderId,
                status
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLOrder.OrderEntry entry = FakeApplication.graphQLResultToObject(result, "order/updateStatus", QLOrder.OrderEntry.class);
        assertNotNull(entry);
        assertEquals(orderId, entry.getId());
        assertEquals(status, entry.getStatus());

        return entry;
    }

    public static QLOrder.RefundEntry refundOrder(Long orderId) {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { order { createRefund(orderId: %d) { id amount status } } }",
                orderId
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLOrder.RefundEntry entry = FakeApplication.graphQLResultToObject(result, "order/createRefund", QLOrder.RefundEntry.class);
        assertNotNull(entry);
        assertNotNull(entry.getId());
        assertNotNull(entry.getStatus());
        assertNotNull(entry.getAmount());

        return entry;
    }

    public static void assertErrorMessageEquals(String expected, Result result) {
        try {
            JsonNode node = new ObjectMapper().readValue(contentAsString(result), ObjectNode.class).get("errors");
            assertNotNull(node);
            assertNotNull(node.get(0));
            assertNotNull(node.get(0).get("message"));
            assertEquals(String.format("\"%s\"", expected), node.get(0).get("message").toString());
        } catch (IOException e) {
            fail();
        }
    }
}
