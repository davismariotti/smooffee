package actions;

import models.BaseModel;
import models.Organization;
import models.Product;
import utilities.QLException;

public class ProductActions {
    public static Product createProduct(Long organizationId, String name, String description, Integer price) {
        Organization organization = Organization.find.byId(organizationId);
        if (organization == null) throw new QLException("Organization not found");
        return new Product()
                .setName(name)
                .setDescription(description)
                .setPrice(price)
                .setOrganization(organization)
                .setStatus(BaseModel.ACTIVE)
                .store();
    }

    public static Product updateProduct(Long productId, String name, String description, Integer price, Integer status) {
        Product product = Product.find.byId(productId);
        if (product == null) throw new QLException("Product not found");
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStatus(status);
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
