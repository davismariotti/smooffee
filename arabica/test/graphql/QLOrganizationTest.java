package graphql;

import environment.FakeApplication;
import environment.Setup;
import helpers.QL;
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
        QLOrganization.OrganiationInput input = new QLOrganization.OrganiationInput();
        input.setName("Next Organization");

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { organization { create(input: %s) { id name } } }",
                QL.prepare(input)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLOrganization.OrganizationEntry entry = FakeApplication.graphQLResultToObject(result, "organization/create", QLOrganization.OrganizationEntry.class);
        assertEquals("Next Organization", entry.getName());
        assertNotNull(entry.getId());
        organizationId = entry.getId();
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
}
