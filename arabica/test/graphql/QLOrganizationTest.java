package graphql;

import environment.FakeApplication;
import environment.Setup;
import helpers.QL;
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
        QLOrganization.OrganiationInput input = new QLOrganization.OrganiationInput();
        input.setName("Next Organization");

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { organization { create(input: %s) { id name } } }",
                QL.prepare(input)
        ));
        assertEquals(OK, result.status());
        QLOrganization.OrganizationEntry organization = FakeApplication.graphQLResultToObject(result, "organization/create", QLOrganization.OrganizationEntry.class);
        assertEquals("Next Organization", organization.getName());
    }
}
