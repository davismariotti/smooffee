package graphql;

import environment.FakeApplication;
import environment.Setup;
import helpers.QL;
import org.junit.*;
import play.mvc.Result;
import services.AuthenticationService;

import static org.junit.Assert.*;
import static play.mvc.Http.Status.OK;

public class QLProductTest {

    private static Long productId;

    @BeforeClass
    public static void setup() {
        FakeApplication.start(true);
        Setup.createDefaultOrganization();
        Setup.createDefaultSysadmin();
        AuthenticationService.mockMap.put("test2@test.com", "test2@test.com");
        createProductTest();
    }

    @AfterClass
    public static void teardown() {
        FakeApplication.stop();
    }

    public static void createProductTest() {
        QLProduct.ProductInput input = new QLProduct.ProductInput();
        input.setName("Latte");
        input.setDescription("Very yummy");
        input.setPrice(500);

        Result result = FakeApplication.routeGraphQLRequest(String.format(
                "mutation { product { create(organizationId: %d, productInput: %s) { id organizationId name description price } } }",
                Setup.defaultOrganization.getId(),
                QL.prepare(input)
        ));

        assertEquals(OK, result.status());
        QLProduct.ProductEntry entry = FakeApplication.graphQLResultToObject(result, "product/create", QLProduct.ProductEntry.class);
        assertEquals("Latte", entry.getName());
        assertEquals("Very yummy", entry.getDescription());
        assertEquals(500, entry.getPrice().intValue());
        assertEquals(Setup.defaultOrganization.getId(), entry.getOrganizationId());
        assertNotNull(entry.getId());
        productId = entry.getId();
    }

    @Test
    public void updateProductTest() {
        QLProduct.ProductInput input = new QLProduct.ProductInput();
        input.setName("Macchiato");
        input.setDescription("Very nice");
        input.setPrice(625);

        Result result = FakeApplication.routeGraphQLRequest(String.format("mutation { product { update(productId: %d, productInput: %s) { id organizationId name description price } } }", productId, QL.prepare(input)));
        assertEquals(OK, result.status());
        QLProduct.ProductEntry entry = FakeApplication.graphQLResultToObject(result, "product/update", QLProduct.ProductEntry.class);
        assertEquals("Macchiato", entry.getName());
        assertEquals("Very nice", entry.getDescription());
        assertEquals(625, entry.getPrice().intValue());
        assertEquals(Setup.defaultOrganization.getId(), entry.getOrganizationId());
        assertEquals(productId, entry.getId());
    }

    @Test
    public void listProductsTest() {
        Result result = FakeApplication.routeGraphQLRequest(String.format("query { product { list(organizationId: %d) { id organizationId name description price status } } }", Setup.defaultOrganization.getId()));
        assertEquals(OK, result.status());
        QLProduct.ProductEntry[] entries = FakeApplication.graphQLResultToObject(result, "product/list", QLProduct.ProductEntry[].class);
        assertTrue(entries.length > 0);
    }
}
