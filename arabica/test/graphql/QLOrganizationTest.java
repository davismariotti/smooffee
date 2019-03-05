package graphql;

import environment.FakeApplication;
import environment.Setup;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import play.mvc.Result;

import static org.junit.Assert.assertEquals;
import static play.mvc.Http.Status.OK;

public class QLOrganizationTest {

    @Before
    public void setup() {
        FakeApplication.start(true);
        Setup.createDefaultOrganization();
        Setup.createDefaultSysadmin();
    }

    @After
    public void teardown() {
        FakeApplication.stop();
    }

    @Test
    public void createOrganization() {
        Result result = FakeApplication.routeGraphQLRequest("mutation { organization { create(input: { name: \\\"Next Organization\\\"}) { id name } } }");
        assertEquals(OK, result.status());
        QLOrganization.OrganizationEntry organization = FakeApplication.graphQLResultToObject(result, "organization/create", QLOrganization.OrganizationEntry.class);
        assertEquals("Next Organization", organization.getName());
    }
}