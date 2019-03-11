package graphql;

import environment.FakeApplication;
import environment.Setup;
import helpers.QL;
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

        QLUser.UserInput input = new QLUser.UserInput();
        input.setFirstName("User");
        input.setLastName("2");
        input.setEmail("test2@test.com");

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { user { create(organizationId: %d, userInput: %s) { id firstName lastName email organizationId } } }",
                Setup.defaultOrganization.getId(),
                QL.prepare(input)
        ));

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

        QLUser.UserInput input = new QLUser.UserInput();
        input.setFirstName("User");
        input.setLastName("2");
        input.setEmail("test2@test.com");

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { user { create(organizationId: %d, userInput: %s) { id firstName lastName email organizationId } } }",
                Setup.defaultOrganization.getId(),
                QL.prepare(input)
        ));
        assertEquals(OK, result.status());
        QLUser.UserEntry user = FakeApplication.graphQLResultToObject(result, "user/create", QLUser.UserEntry.class);
        assertNotNull(user.getId());
        assertEquals("User", user.getFirstname());
        assertEquals("2", user.getLastname());
        assertEquals(Setup.defaultOrganization.getId(), user.getOrganizationId());
        assertEquals("test2@test.com", user.getEmail());

        input.setFirstName("Usen");
        input.setLastName("3");
        input.setEmail("test2@test.com");

        result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { user { update(userId: %s, userInput: %s) { id firstName lastName email organizationId } } }",
                QL.prepare(user.getId()),
                QL.prepare(input)
        ));
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
