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
        QLOrderModifier.OrderModifierEntry deliveryPeriodEntry = createOrderModifier("Caramel Syrup");
        orderModifierId = deliveryPeriodEntry.getId();
    }

    @AfterClass
    public static void teardown() {
        FakeApplication.stop();
    }

    @Test
    public void readOrderModifierTest() {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { orderModifier { read(id: %d) { id name status } } }",
                orderModifierId
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLOrderModifier.OrderModifierEntry entry = FakeApplication.graphQLResultToObject(result, "orderModifier/read", QLOrderModifier.OrderModifierEntry.class);
        assertNotNull(entry);
        assertEquals(orderModifierId, entry.getId());
        assertEquals("Caramel Syrup", entry.getName());
        assertEquals(BaseModel.ACTIVE, entry.getStatus().intValue());
    }

    @Test
    public void listOrderModifierTest() {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { orderModifier { list(organizationId: %d, parameters: { filter: { eq: { field: \\\"status\\\", value: \\\"1\\\" } } }) { id name status } } }",
                Setup.defaultOrganization.getId()
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());
        QLOrderModifier.OrderModifierEntry[] entries = FakeApplication.graphQLResultToObject(result, "orderModifier/list", QLOrderModifier.OrderModifierEntry[].class);
        assertNotNull(entries);
        assertEquals(2, entries.length);
        assertEquals(orderModifierId, entries[0].getId());
        assertEquals("Caramel Syrup", entries[0].getName());
        assertEquals(BaseModel.ACTIVE, entries[0].getStatus().intValue());
    }

    @Test
    public void updateOrderModifierTest() {
        QLOrderModifier.OrderModifierEntry createEntry = createOrderModifier("Caramel Syrup");

        QLOrderModifier.OrderModifierInput input = new QLOrderModifier.OrderModifierInput();
        input.setName("Hazelnut Syrup");

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { orderModifier { update(orderModifierId: %d, orderModifierInput: %s) { id name status } } }",
                createEntry.getId(),
                QL.prepare(input)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLOrderModifier.OrderModifierEntry entry = FakeApplication.graphQLResultToObject(result, "orderModifier/update", QLOrderModifier.OrderModifierEntry.class);
        assertNotNull(entry);
        assertEquals(createEntry.getId(), entry.getId());
        assertEquals("Hazelnut Syrup", entry.getName());
        assertEquals(BaseModel.ACTIVE, entry.getStatus().intValue());
    }

    @Test
    public void updateOrderModifierStatusTest() {
        String name = "Caramel Syrup";
        QLOrderModifier.OrderModifierEntry createEntry = createOrderModifier(name);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { orderModifier { updateStatus(orderModifierId: %d, status: %d) { id name status } } }",
                createEntry.getId(),
                BaseModel.DELETED
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLOrderModifier.OrderModifierEntry entry = FakeApplication.graphQLResultToObject(result, "orderModifier/updateStatus", QLOrderModifier.OrderModifierEntry.class);
        assertNotNull(entry);
        assertEquals(createEntry.getId(), entry.getId());
        assertEquals(name, entry.getName());
        assertEquals(BaseModel.DELETED, entry.getStatus().intValue());
    }

    public static QLOrderModifier.OrderModifierEntry createOrderModifier(String name) {
        QLOrderModifier.OrderModifierInput input = new QLOrderModifier.OrderModifierInput();
        input.setName(name);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { orderModifier { create(organizationId: %s, orderModifierInput: %s) { id name status } } }",
                QL.prepare(Setup.defaultOrganization.getId()),
                QL.prepare(input)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());
        QLOrderModifier.OrderModifierEntry entry = FakeApplication.graphQLResultToObject(result, "orderModifier/create", QLOrderModifier.OrderModifierEntry.class);
        assertNotNull(entry);
        assertNotNull(entry.getId());
        assertEquals(name, entry.getName());
        assertEquals(BaseModel.ACTIVE, entry.getStatus().intValue());

        return entry;
    }
}
