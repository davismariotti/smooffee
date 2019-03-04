package actions;

import models.Organization;
import models.Product;

public class ProductActions {
    public static Product createProduct(Long organizationId, String name, String description, Integer price) {
        Organization organization = Organization.find.byId(organizationId);
        if (organization == null) throw new RuntimeException("Organization not found");
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setOrganization(organization);
        product.save();
        return product;
    }

    public static Product updateProduct(Long productId, String name, String description, Integer price) {
        Product product = Product.find.byId(productId);
        if (product == null) throw new RuntimeException("Product not found");
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.save();
        return product;
    }

    public static boolean deprecateProduct(Long id) {
        Product product = Product.find.byId(id);
        if (product == null) {
            return false;
        }
        product.deprecate();
        product.save();
        return true;
    }
}
