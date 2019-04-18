package graphql;

import environment.FakeApplication;
import environment.Setup;
import helpers.QL;
import models.BaseModel;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import play.mvc.Result;
import services.AuthenticationService;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static play.mvc.Http.Status.OK;

public class QLUserTest {

    private static final String uid = "test2@test.com";

    @BeforeClass
    public static void setup() {
        FakeApplication.start(true);
        Setup.createDefaultOrganization();
        Setup.createDefaultSysadmin();
        AuthenticationService.mockMap.put(uid, uid);
        createUserTest();
        readUserTest();
    }

    @AfterClass
    public static void teardown() {
        FakeApplication.stop();
    }

    public static void createUserTest() {
        FakeApplication.authToken.push(uid);

        QLUser.UserInput input = new QLUser.UserInput();
        input.setFirstName("User");
        input.setLastName("2");
        input.setEmail(uid);

        QLUser.UserEntry entry = createUser(input);
        assertEquals(uid, entry.getId());
        assertEquals("User", entry.getFirstname());
        assertEquals("2", entry.getLastname());
        assertEquals(Setup.defaultOrganization.getId(), entry.getOrganizationId());
        assertEquals(uid, entry.getEmail());
        FakeApplication.authToken.pop();
    }

    @Test
    public void updateUser() {
        QLUser.UserInput input = new QLUser.UserInput();
        input.setFirstName("Usen");
        input.setLastName("3");
        input.setEmail(uid);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { user { update(userId: %s, userInput: %s) { id firstName lastName email organizationId } } }",
                QL.prepare(uid),
                QL.prepare(input)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLUser.UserEntry entry = FakeApplication.graphQLResultToObject(result, "user/update", QLUser.UserEntry.class);
        assertNotNull(entry);
        assertEquals(uid, entry.getId());
        assertEquals("Usen", entry.getFirstname());
        assertEquals("3", entry.getLastname());
        assertEquals(Setup.defaultOrganization.getId(), entry.getOrganizationId());
        assertEquals("test2@test.com", entry.getEmail());

        FakeApplication.authToken.pop();
    }

    public static void readUserTest() {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "query { user { read(id: %s) { id firstName lastName email balance } } }",
                QL.prepare(uid)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLUser.UserEntry entry = FakeApplication.graphQLResultToObject(result, "user/read", QLUser.UserEntry.class);
        assertNotNull(entry);
        assertEquals(0, entry.getBalance().intValue());
        assertEquals(uid, entry.getId());
        assertEquals(uid, entry.getEmail());
        assertEquals("User", entry.getFirstname());
        assertEquals("2", entry.getLastname());
    }

    public static QLUser.UserEntry createUser(QLUser.UserInput input) {
        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { user { create(organizationId: %d, userInput: %s) { id firstName lastName email organizationId status } } }",
                Setup.defaultOrganization.getId(),
                QL.prepare(input)
        ));
        assertNotNull(result);
        assertEquals(OK, result.status());

        QLUser.UserEntry entry = FakeApplication.graphQLResultToObject(result, "user/create", QLUser.UserEntry.class);
        assertNotNull(entry);
        assertEquals(input.getFirstName(), entry.getFirstname());
        assertEquals(input.getLastName(), entry.getLastname());
        assertEquals(input.getEmail(), entry.getEmail());
        assertEquals(BaseModel.ACTIVE, entry.getStatus().intValue());
        return entry;
    }
}
