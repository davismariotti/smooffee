package graphql;

import environment.FakeApplication;
import environment.Setup;
import helpers.QL;
import models.BaseModel;
import org.junit.*;
import play.mvc.Result;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static play.mvc.Http.Status.OK;

public class QLOrganizationTest {

    private static Long organizationId;

    @BeforeClass
    public static void setup() {
        FakeApplication.start(true);
        Setup.createDefaultOrganization();
        Setup.createDefaultSysadmin();
        createOrganizationTest();
    }

    @AfterClass
    public static void teardown() {
        FakeApplication.stop();
    }

    public static void createOrganizationTest() {
        QLOrganization.OrganizationEntry entry = createOrganization("Next Organization");
        organizationId = entry.getId();
    }

    @Test
    public void updateOrganizationTest() {
        QLOrganization.OrganizationEntry orgEntry = createOrganization("Org");
        assertEquals("Org", orgEntry.getName());

        QLOrganization.OrganizationInput input = new QLOrganization.OrganizationInput();
        input.setName("Org2");
        input.setStatus(BaseModel.DELETED);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { organization { update(organizationId: %d, organizationInput: %s) { id name status } } }",
                orgEntry.getId(),
                QL.prepare(input)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLOrganization.OrganizationEntry entry = FakeApplication.graphQLResultToObject(result, "organization/update", QLOrganization.OrganizationEntry.class);
        assertNotNull(entry);
        assertEquals("Org2", entry.getName());
        assertEquals(BaseModel.DELETED, entry.getStatus().intValue());
    }

    @Test
    public void readOrganizationTest() {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { organization { read(id: %d) { id name } } }",
                organizationId
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLOrganization.OrganizationEntry entry = FakeApplication.graphQLResultToObject(result, "organization/read", QLOrganization.OrganizationEntry.class);
        assertEquals("Next Organization", entry.getName());
        assertEquals(organizationId, entry.getId());
    }

    @Test
    public void listOrganizationsTest() {
        Result result = FakeApplication.routeGraphQLRequest("query { organization { list { id name } } }");
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLOrganization.OrganizationEntry[] entries = FakeApplication.graphQLResultToObject(result, "organization/list", QLOrganization.OrganizationEntry[].class);
        assertNotNull(entries);
        assertEquals(2, entries.length);

        assertEquals("Default", entries[0].getName());
        assertEquals(Setup.defaultOrganization.getId(), entries[0].getId());

        assertEquals("Next Organization", entries[1].getName());
        assertEquals(organizationId, entries[1].getId());
    }

    public static QLOrganization.OrganizationEntry createOrganization(String name) {
        QLOrganization.OrganizationInput input = new QLOrganization.OrganizationInput();
        input.setName(name);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { organization { create(input: %s) { id name status } } }",
                QL.prepare(input)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLOrganization.OrganizationEntry entry = FakeApplication.graphQLResultToObject(result, "organization/create", QLOrganization.OrganizationEntry.class);
        assertEquals(name, entry.getName());
        assertEquals(BaseModel.ACTIVE, entry.getStatus().intValue());
        assertNotNull(entry.getId());
        return entry;
    }
 }
