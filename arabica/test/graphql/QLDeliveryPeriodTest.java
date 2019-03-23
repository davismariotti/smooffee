package graphql;

import environment.FakeApplication;
import environment.Setup;
import helpers.QL;
import models.BaseModel;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import play.mvc.Result;

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
        QLDeliveryPeriod.DeliveryPeriodEntry deliveryPeriodEntry = createDeliveryPeriod(1);
        deliveryPeriodId = deliveryPeriodEntry.getId();
    }

    @AfterClass
    public static void teardown() {
        FakeApplication.stop();
    }

    @Test
    public void readDeliveryPeriodTest() {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { deliveryPeriod { read(id: %d) { id classPeriod } } }",
                deliveryPeriodId
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLDeliveryPeriod.DeliveryPeriodEntry entry = FakeApplication.graphQLResultToObject(result, "deliveryPeriod/read", QLDeliveryPeriod.DeliveryPeriodEntry.class);
        assertNotNull(entry);
        assertEquals(1, entry.getClassPeriod().intValue());
    }

    public static QLDeliveryPeriod.DeliveryPeriodEntry createDeliveryPeriod(int classPeriod) {
        QLDeliveryPeriod.DeliveryPeriodInput input = new QLDeliveryPeriod.DeliveryPeriodInput();
        input.setStatus(BaseModel.ACTIVE);
        input.setClassPeriod(classPeriod);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { deliveryPeriod { create(organizationId: %s, deliveryPeriodInput: %s) { id classPeriod } } }",
                QL.prepare(Setup.defaultOrganization.getId()),
                QL.prepare(input)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());
        QLDeliveryPeriod.DeliveryPeriodEntry entry = FakeApplication.graphQLResultToObject(result, "deliveryPeriod/create", QLDeliveryPeriod.DeliveryPeriodEntry.class);
        assertNotNull(entry.getId());
        assertEquals(classPeriod, entry.getClassPeriod().intValue());

        return entry;
    }
}
