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

public class QLProductTest {

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
    public void createProductTest() {
        Result result = createProduct();
        assertEquals(OK, result.status());
        QLProduct.ProductEntry entry = FakeApplication.graphQLResultToObject(result, "product/create", QLProduct.ProductEntry.class);
        assertEquals("Latte", entry.getName());
        assertEquals("Very yummy", entry.getDescription());
        assertEquals(500, entry.getPrice().intValue());
        assertEquals(Setup.defaultOrganization.getId(), entry.getOrganizationId());
        assertNotNull(entry.getId());
    }

    @Test
    public void updateProductTest() {
        Result result = createProduct();
        assertEquals(OK, result.status());
        QLProduct.ProductEntry entry = FakeApplication.graphQLResultToObject(result, "product/create", QLProduct.ProductEntry.class);
        Long productId = entry.getId();
        result = FakeApplication.routeGraphQLRequest(String.format("mutation { product { update(id: %d, productInput: { name: \\\"Macchiato\\\", description: \\\"Very nice\\\", price: 625, status: 1 }) { id organizationId name description price } } }", entry.getId()));
        entry = FakeApplication.graphQLResultToObject(result, "product/update", QLProduct.ProductEntry.class);
        assertEquals("Macchiato", entry.getName());
        assertEquals("Very nice", entry.getDescription());
        assertEquals(625, entry.getPrice().intValue());
        assertEquals(Setup.defaultOrganization.getId(), entry.getOrganizationId());
        assertEquals(productId, entry.getId());

    }

    public Result createProduct() {
        return FakeApplication.routeGraphQLRequest(String.format("mutation { product { create(organizationId: %d, productInput: { name: \\\"Latte\\\", description: \\\"Very yummy\\\", price: 500, status: 1}) { id organizationId name description price } } }", Setup.defaultOrganization.getId()));
    }
}
