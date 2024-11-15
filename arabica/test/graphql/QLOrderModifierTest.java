package graphql;

import environment.FakeApplication;
import environment.Setup;
import helpers.QL;
import models.BaseModel;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import play.mvc.Result;

import static org.junit.Assert.*;
import static play.mvc.Http.Status.OK;

public class QLOrderModifierTest {

    private static Long orderModifierId;

    @BeforeClass
    public static void setup() {
        FakeApplication.start(true);
        Setup.createDefaultOrganization();
        Setup.createDefaultSysadmin();
        Setup.createDefaultProduct();
        QLOrderModifier.OrderModifierEntry deliveryPeriodEntry = createOrderModifier("Caramel Syrup", 100);
        orderModifierId = deliveryPeriodEntry.getId();
    }

    @AfterClass
    public static void teardown() {
        FakeApplication.stop();
    }

    @Test
    public void readOrderModifierTest() {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { orderModifier { read(id: %d) { id name status additionalCost } } }",
                orderModifierId
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLOrderModifier.OrderModifierEntry entry = FakeApplication.graphQLResultToObject(result, "orderModifier/read", QLOrderModifier.OrderModifierEntry.class);
        assertNotNull(entry);
        assertEquals(orderModifierId, entry.getId());
        assertEquals("Caramel Syrup", entry.getName());
        assertEquals(100, entry.getAdditionalCost().intValue());
        assertEquals(BaseModel.ACTIVE_STR, entry.getStatus());
    }

    @Test
    public void listOrderModifierTest() {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { orderModifier { list(organizationId: %d, parameters: { filter: { eq: { field: \\\"status\\\", value: \\\"Active\\\" } } }) { id name status additionalCost } } }",
                Setup.defaultOrganization.getId()
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());
        QLOrderModifier.OrderModifierEntry[] entries = FakeApplication.graphQLResultToObject(result, "orderModifier/list", QLOrderModifier.OrderModifierEntry[].class);
        assertNotNull(entries);
        assertEquals(2, entries.length);
        assertEquals(orderModifierId, entries[0].getId());
        assertEquals("Caramel Syrup", entries[0].getName());
        assertEquals(BaseModel.ACTIVE_STR, entries[0].getStatus());
    }

    @Test
    public void updateOrderModifierTest() {
        QLOrderModifier.OrderModifierEntry createEntry = createOrderModifier("Caramel Syrup", 100);

        QLOrderModifier.OrderModifierInput input = new QLOrderModifier.OrderModifierInput();
        input.setName("Hazelnut Syrup");
        input.setAdditionalCost(150);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { orderModifier { update(orderModifierId: %d, orderModifierInput: %s) { id name status additionalCost } } }",
                createEntry.getId(),
                QL.prepare(input)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLOrderModifier.OrderModifierEntry entry = FakeApplication.graphQLResultToObject(result, "orderModifier/update", QLOrderModifier.OrderModifierEntry.class);
        assertNotNull(entry);
        assertEquals(createEntry.getId(), entry.getId());
        assertEquals("Hazelnut Syrup", entry.getName());
        assertEquals(150, entry.getAdditionalCost().intValue());
        assertEquals(BaseModel.ACTIVE_STR, entry.getStatus());
    }

    @Test
    public void updateOrderModifierStatusTest() {
        String name = "Caramel Syrup";
        QLOrderModifier.OrderModifierEntry createEntry = createOrderModifier(name, 100);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { orderModifier { updateStatus(orderModifierId: %d, status: %s) { id name status additionalCost } } }",
                createEntry.getId(),
                QL.prepare(BaseModel.DELETED_STR)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLOrderModifier.OrderModifierEntry entry = FakeApplication.graphQLResultToObject(result, "orderModifier/updateStatus", QLOrderModifier.OrderModifierEntry.class);
        assertNotNull(entry);
        assertEquals(createEntry.getId(), entry.getId());
        assertEquals(name, entry.getName());
        assertEquals(BaseModel.DELETED_STR, entry.getStatus());
    }

    public static QLOrderModifier.OrderModifierEntry createOrderModifier(String name, Integer additionalCost) {
        QLOrderModifier.OrderModifierInput input = new QLOrderModifier.OrderModifierInput();
        input.setName(name);
        input.setAdditionalCost(additionalCost);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { orderModifier { create(organizationId: %s, orderModifierInput: %s) { id name status additionalCost } } }",
                QL.prepare(Setup.defaultOrganization.getId()),
                QL.prepare(input)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());
        QLOrderModifier.OrderModifierEntry entry = FakeApplication.graphQLResultToObject(result, "orderModifier/create", QLOrderModifier.OrderModifierEntry.class);
        assertNotNull(entry);
        assertNotNull(entry.getId());
        assertEquals(name, entry.getName());
        assertEquals(additionalCost, entry.getAdditionalCost());
        assertEquals(BaseModel.ACTIVE_STR, entry.getStatus());

        return entry;
    }
}
