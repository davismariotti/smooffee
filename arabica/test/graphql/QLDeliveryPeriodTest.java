package graphql;

import environment.FakeApplication;
import environment.Setup;
import helpers.QL;
import models.BaseModel;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import play.mvc.Result;
import utilities.QLFinder;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static play.mvc.Http.Status.OK;

public class QLDeliveryPeriodTest {

    private static Long deliveryPeriodId;

    @BeforeClass
    public static void setup() {
        FakeApplication.start(true);
        Setup.createDefaultOrganization();
        Setup.createDefaultSysadmin();
        QLDeliveryPeriod.DeliveryPeriodEntry deliveryPeriodEntry = createDeliveryPeriod(1, "monday", "tuesday", "wednesday", "thursday", "friday");
        deliveryPeriodId = deliveryPeriodEntry.getId();
    }

    @AfterClass
    public static void teardown() {
        FakeApplication.stop();
    }

    @Test
    public void readDeliveryPeriodTest() {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { deliveryPeriod { read(id: %d) { id classPeriod status } } }",
                deliveryPeriodId
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLDeliveryPeriod.DeliveryPeriodEntry entry = FakeApplication.graphQLResultToObject(result, "deliveryPeriod/read", QLDeliveryPeriod.DeliveryPeriodEntry.class);
        assertNotNull(entry);
        assertEquals(deliveryPeriodId, entry.getId());
        assertEquals(1, entry.getClassPeriod().intValue());
        assertEquals(BaseModel.ACTIVE, entry.getStatus().intValue());
    }

    @Test
    public void listDeliveryPeriodTest() {

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { deliveryPeriod { list(organizationId: %d, parameters: { filter: { eq: { field: \\\"status\\\", value: \\\"1\\\" } } }) { id classPeriod status } } }",
                Setup.defaultOrganization.getId()
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());
        QLDeliveryPeriod.DeliveryPeriodEntry[] entries = FakeApplication.graphQLResultToObject(result, "deliveryPeriod/list", QLDeliveryPeriod.DeliveryPeriodEntry[].class);
        assertNotNull(entries);
        assertEquals(2, entries.length);
        assertEquals(deliveryPeriodId, entries[0].getId());
        assertEquals(1, entries[0].getClassPeriod().intValue());
        assertEquals(BaseModel.ACTIVE, entries[0].getStatus().intValue());
    }

    @Test
    public void updateDeliveryPeriodTest() {
        QLDeliveryPeriod.DeliveryPeriodEntry createEntry = createDeliveryPeriod(4);

        QLDeliveryPeriod.DeliveryPeriodInput input = new QLDeliveryPeriod.DeliveryPeriodInput();
        input.setClassPeriod(3);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { deliveryPeriod { update(deliveryPeriodId: %d, deliveryPeriodInput: %s) { id classPeriod status } } }",
                createEntry.getId(),
                QL.prepare(input)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLDeliveryPeriod.DeliveryPeriodEntry entry = FakeApplication.graphQLResultToObject(result, "deliveryPeriod/update", QLDeliveryPeriod.DeliveryPeriodEntry.class);
        assertNotNull(entry);
        assertEquals(createEntry.getId(), entry.getId());
        assertEquals(3, entry.getClassPeriod().intValue());
    }

    @Test
    public void updateDeliveryPeriodStatusTest() {
        QLDeliveryPeriod.DeliveryPeriodEntry createEntry = createDeliveryPeriod(5);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { deliveryPeriod { updateStatus(deliveryPeriodId: %d, status: %d) { id classPeriod status } } }",
                createEntry.getId(),
                BaseModel.DELETED
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLDeliveryPeriod.DeliveryPeriodEntry entry = FakeApplication.graphQLResultToObject(result, "deliveryPeriod/updateStatus", QLDeliveryPeriod.DeliveryPeriodEntry.class);
        assertNotNull(entry);
        assertEquals(createEntry.getId(), entry.getId());
        assertEquals(5, entry.getClassPeriod().intValue());
        assertEquals(BaseModel.DELETED, entry.getStatus().intValue());
    }

    public static QLDeliveryPeriod.DeliveryPeriodEntry createDeliveryPeriod(int classPeriod) {
        return createDeliveryPeriod(classPeriod, null, null, null, null, null);
    }

    public static QLDeliveryPeriod.DeliveryPeriodEntry createDeliveryPeriod(int classPeriod, String monday, String tuesday, String wednesday, String thursday, String friday) {
        QLDeliveryPeriod.DeliveryPeriodInput input = new QLDeliveryPeriod.DeliveryPeriodInput();
        input.setClassPeriod(classPeriod);
        input.setMonday(monday);
        input.setTuesday(tuesday);
        input.setWednesday(wednesday);
        input.setThursday(thursday);
        input.setFriday(friday);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { deliveryPeriod { create(organizationId: %s, deliveryPeriodInput: %s) { id classPeriod status monday tuesday wednesday thursday friday } } }",
                QL.prepare(Setup.defaultOrganization.getId()),
                QL.prepare(input)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());
        QLDeliveryPeriod.DeliveryPeriodEntry entry = FakeApplication.graphQLResultToObject(result, "deliveryPeriod/create", QLDeliveryPeriod.DeliveryPeriodEntry.class);
        assertNotNull(entry);
        assertNotNull(entry.getId());
        assertEquals(classPeriod, entry.getClassPeriod().intValue());
        assertEquals(BaseModel.ACTIVE, entry.getStatus().intValue());
        assertEquals(monday, entry.getMonday());
        assertEquals(tuesday, entry.getTuesday());
        assertEquals(wednesday, entry.getWednesday());
        assertEquals(thursday, entry.getThursday());
        assertEquals(friday, entry.getFriday());

        return entry;
    }
}
