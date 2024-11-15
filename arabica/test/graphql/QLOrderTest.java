package graphql;

import environment.FakeApplication;
import environment.Setup;
import helpers.QL;
import models.BaseModel;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import play.mvc.Result;

import java.util.ArrayList;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static play.mvc.Http.Status.OK;

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
        Setup.createDefaultOrderModifier();

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
        orderInput.setSize("Medium");
        orderInput.setDeliveryPeriodId(Setup.defaultDeliveryPeriod.getId());
        orderInput.setProductId(Setup.defaultProduct.getId());
        orderInput.setOrderModifiers(new ArrayList<Long>() {{
            add(Setup.defaultOrderModifier.getId());
        }});

        QLOrder.OrderEntry entry = createOrder(orderInput);
        orderId = entry.getId();

        assertEquals("Notes", entry.getNotes());
        assertEquals("HUB", entry.getLocation());
        assertEquals("Davis Mariotti", entry.getRecipient());
        assertEquals("Medium", entry.getSize());
        assertNotNull(entry.getProduct());
        assertNotNull(entry.getDeliveryPeriod());
        assertEquals(Setup.defaultProduct.getId(), entry.getProduct().getId());
        assertEquals(Setup.defaultDeliveryPeriod.getId(), entry.getDeliveryPeriod().getId());
        assertNotNull(entry.getOrderModifiers());
        assertEquals(1, entry.getOrderModifiers().size());
        assertEquals("Caramel Syrup", entry.getOrderModifiers().get(0).getName());
        assertEquals(Setup.defaultOrderModifier.getId(), entry.getOrderModifiers().get(0).getId());
        assertEquals(750, entry.getTotalCost().intValue());

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
        orderInput.setSize("Medium");
        orderInput.setDeliveryPeriodId(Setup.defaultDeliveryPeriod.getId());
        orderInput.setProductId(Setup.defaultProduct.getId());

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { order { create(userId: %s, orderInput: %s) { id location notes recipient size product { id } } } }",
                QL.prepare(Setup.defaultSysadmin.getFirebaseUserId()),
                QL.prepare(orderInput)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        FakeApplication.assertErrorMessageEquals("Exception while fetching data (/order/create) : Insufficient funds", result);
    }

    @Test
    public void readOrderTest() {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { order { read(id: %d) { id location notes product { id } deliveryPeriod { id classPeriod } status recipient totalCost size } } }",
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
        assertEquals("Medium", entry.getSize());
        assertNotNull(entry.getProduct());
        assertNotNull(entry.getDeliveryPeriod());
        assertEquals(Setup.defaultProduct.getId(), entry.getProduct().getId());
        assertEquals(Setup.defaultDeliveryPeriod.getId(), entry.getDeliveryPeriod().getId());
        assertEquals(BaseModel.ACTIVE_STR, entry.getStatus());
        assertEquals(750, entry.getTotalCost().intValue());
    }

    @Test
    public void listOrdersTest() {
        QLPaymentTest.createPaymentCash(Setup.defaultProduct.getPrice());

        QLOrder.OrderInput orderInput = new QLOrder.OrderInput();
        orderInput.setLocation("EJ308");
        orderInput.setNotes("Other notes");
        orderInput.setRecipient("Tom Dale");
        orderInput.setSize("Large");
        orderInput.setDeliveryPeriodId(Setup.defaultDeliveryPeriod.getId());
        orderInput.setProductId(Setup.defaultProduct.getId());

        createOrder(orderInput);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { order { list(organizationId: %d, parameters: { filter: { eq: { field: \\\"status\\\", value: \\\"Active\\\" } } }) { id location notes product { id } status recipient size totalCost } } }",
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
        assertEquals("Medium", entries[0].getSize());
        assertNotNull(entries[0].getTotalCost());

        assertEquals("EJ308", entries[1].getLocation());
        assertEquals("Other notes", entries[1].getNotes());
        assertEquals("Tom Dale", entries[1].getRecipient());
        assertEquals("Large", entries[1].getSize());
        assertNotNull(entries[1].getTotalCost());
    }

    @Test
    public void cancelActiveOrderTest() {
        QLPaymentTest.createPaymentCash(Setup.defaultCustomer.getFirebaseUserId(), Setup.defaultProduct.getPrice());
        FakeApplication.authToken.push(Setup.defaultCustomer.getFirebaseUserId());
        QLOrder.OrderInput orderInput = new QLOrder.OrderInput();
        orderInput.setLocation("EJ308");
        orderInput.setNotes("Other notes");
        orderInput.setRecipient("Tom Dale");
        orderInput.setSize("Medium");
        orderInput.setDeliveryPeriodId(Setup.defaultDeliveryPeriod.getId());
        orderInput.setProductId(Setup.defaultProduct.getId());

        QLOrder.OrderEntry entry = createOrder(Setup.defaultCustomer.getFirebaseUserId(), orderInput);

        // Cancel order
        updateOrderStatus(entry.getId(), BaseModel.CANCELLED_STR);

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
        orderInput.setSize("Medium");
        orderInput.setDeliveryPeriodId(Setup.defaultDeliveryPeriod.getId());
        orderInput.setProductId(Setup.defaultProduct.getId());

        QLOrder.OrderEntry entry = createOrder(Setup.defaultCustomer.getFirebaseUserId(), orderInput);

        String tempToken = FakeApplication.authToken.pop();

        // Start order
        updateOrderStatus(entry.getId(), BaseModel.IN_PROGRESS_STR);
        FakeApplication.authToken.push(tempToken);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { order { updateStatus(orderId: %d, status: %s) { id status totalCost } } }",
                entry.getId(),
                QL.prepare(BaseModel.CANCELLED_STR)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());
        FakeApplication.assertErrorMessageEquals("Exception while fetching data (/order/updateStatus) : Order cannot be cancelled at this time.", result);

        FakeApplication.authToken.pop();
    }

    @Test
    public void refundOrder() {
        QLPaymentTest.createPaymentCash(Setup.defaultProduct.getPrice());
        QLOrder.OrderInput orderInput = new QLOrder.OrderInput();
        orderInput.setLocation("HUB");
        orderInput.setNotes("Notes");
        orderInput.setRecipient("Davis Mariotti");
        orderInput.setSize("Medium");
        orderInput.setDeliveryPeriodId(Setup.defaultDeliveryPeriod.getId());
        orderInput.setProductId(Setup.defaultProduct.getId());
        QLOrder.OrderEntry entry = createOrder(orderInput);

        // Update to completed
        updateOrderStatus(entry.getId(), BaseModel.IN_PROGRESS_STR);
        updateOrderStatus(entry.getId(), BaseModel.COMPLETED_STR);

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
                "mutation { order { create(userId: %s, orderInput: %s) { id location notes recipient size status totalCost product { id } deliveryPeriod { id } orderModifiers { id name } } } }",
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
        assertEquals(input.getSize(), entry.getSize());
        assertEquals(BaseModel.ACTIVE_STR, entry.getStatus());

        return entry;
    }

    public static QLOrder.OrderEntry updateOrderStatus(Long orderId, String status) {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { order { updateStatus(orderId: %d, status: %s) { id status totalCost size } } }",
                orderId,
                QL.prepare(status)
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
}
