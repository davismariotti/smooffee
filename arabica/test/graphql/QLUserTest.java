package graphql;

import environment.FakeApplication;
import environment.Setup;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import play.mvc.Result;
import services.AuthenticationService;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static play.mvc.Http.Status.OK;

public class QLUserTest {

    @Before
    public void setup() {
        FakeApplication.start(true);
        Setup.createDefaultOrganization();
        Setup.createDefaultSysadmin();
        AuthenticationService.mockMap.put("test2@test.com", "test2@test.com");
    }

    @After
    public void teardown() {
        FakeApplication.stop();
    }

    @Test
    public void createUser() {
        FakeApplication.authToken.push("test2@test.com");
        Result result = FakeApplication.routeGraphQLRequest(String.format("mutation { user { create(organizationId: %d, userInput: { firstName: \\\"User\\\", lastName: \\\"2\\\", email: \\\"test2@test.com\\\"}) { id firstName lastName email organizationId } } }", Setup.defaultOrganization.getId()));
        assertEquals(OK, result.status());
        QLUser.UserEntry user = FakeApplication.graphQLResultToObject(result, "user/create", QLUser.UserEntry.class);
        assertNotNull(user.getId());
        assertEquals("User", user.getFirstname());
        assertEquals("2", user.getLastname());
        assertEquals(Setup.defaultOrganization.getId(), user.getOrganizationId());
        assertEquals("test2@test.com", user.getEmail());
        FakeApplication.authToken.pop();
    }

    @Test
    public void updateUser() {
        FakeApplication.authToken.push("test2@test.com");

        Result result = FakeApplication.routeGraphQLRequest(String.format("mutation { user { create(organizationId: %d, userInput: { firstName: \\\"User\\\", lastName: \\\"2\\\", email: \\\"test2@test.com\\\"}) { id firstName lastName email organizationId } } }", Setup.defaultOrganization.getId()));
        assertEquals(OK, result.status());
        QLUser.UserEntry user = FakeApplication.graphQLResultToObject(result, "user/create", QLUser.UserEntry.class);
        assertNotNull(user.getId());
        assertEquals("User", user.getFirstname());
        assertEquals("2", user.getLastname());
        assertEquals(Setup.defaultOrganization.getId(), user.getOrganizationId());
        assertEquals("test2@test.com", user.getEmail());

        result = FakeApplication.routeGraphQLRequest(String.format("mutation { user { update(userId: \\\"%s\\\", userInput: { firstName: \\\"Usen\\\", lastName: \\\"3\\\", email: \\\"test2@test.com\\\"}) { id firstName lastName email organizationId } } }", user.getId()));
        assertEquals(OK, result.status());
        user = FakeApplication.graphQLResultToObject(result, "user/update", QLUser.UserEntry.class);
        assertNotNull(user.getId());
        assertEquals("Usen", user.getFirstname());
        assertEquals("3", user.getLastname());
        assertEquals(Setup.defaultOrganization.getId(), user.getOrganizationId());
        assertEquals("test2@test.com", user.getEmail());

        FakeApplication.authToken.pop();
    }
}
