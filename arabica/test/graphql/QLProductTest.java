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

        QLProduct.ProductInput input = new QLProduct.ProductInput();
        input.setName("Macchiato");
        input.setDescription("Very nice");
        input.setPrice(625);
        input.setStatus(1);

        result = FakeApplication.routeGraphQLRequest(String.format("mutation { product { update(id: %d, productInput: %s) { id organizationId name description price } } }", entry.getId(), QL.prepare(input)));
        entry = FakeApplication.graphQLResultToObject(result, "product/update", QLProduct.ProductEntry.class);
        assertEquals("Macchiato", entry.getName());
        assertEquals("Very nice", entry.getDescription());
        assertEquals(625, entry.getPrice().intValue());
        assertEquals(Setup.defaultOrganization.getId(), entry.getOrganizationId());
        assertEquals(productId, entry.getId());

    }

    public Result createProduct() {
        QLProduct.ProductInput input = new QLProduct.ProductInput();
        input.setName("Latte");
        input.setDescription("Very yummy");
        input.setPrice(500);
        input.setStatus(1);

        return FakeApplication.routeGraphQLRequest(String.format(
                "mutation { product { create(organizationId: %d, productInput: %s) { id organizationId name description price } } }",
                Setup.defaultOrganization.getId(),
                QL.prepare(input)
        ));
    }
}
