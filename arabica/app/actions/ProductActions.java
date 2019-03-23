package actions;

import models.BaseModel;
import models.Organization;
import models.Product;
import utilities.QLException;

public class ProductActions {
    public static Product createProduct(Organization organization, String name, String description, Integer price) {
        if (organization == null || name == null || description == null || price == null) return null;

        return new Product()
                .setName(name)
                .setDescription(description)
                .setPrice(price)
                .setOrganization(organization)
                .setStatus(BaseModel.ACTIVE)
                .store();
    }

    public static Product updateProduct(Product product, String name, String description, Integer price, Integer status) {
        if (product == null || name == null || description == null || price == null || status == null) return null;
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStatus(status);
        product.save();
        return product;
    }

    public static Product deprecateProduct(Product product) {
        if (product == null) return null;

        return product.deprecate();
    }
}
