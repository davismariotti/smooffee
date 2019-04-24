package actions;

import models.BaseModel;
import models.OrderModifier;
import models.Organization;
import models.Product;

import java.util.Set;

public class ProductActions {
    public static Product createProduct(Organization organization, String name, String description, Integer price, Set<OrderModifier> orderModifiers) {
        if (organization == null || name == null || description == null || price == null) return null;

        return new Product()
                .setName(name)
                .setDescription(description)
                .setPrice(price)
                .setOrganization(organization)
                .setOrderModifiers(orderModifiers)
                .setStatus(BaseModel.ACTIVE)
                .store();
    }

    public static Product updateProduct(Product product, String name, String description, Integer price, Set<OrderModifier> orderModifiers) {
        if (product == null || name == null || description == null || price == null) return null;
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setOrderModifiers(orderModifiers);
        product.save();
        return product;
    }

    public static Product deprecateProduct(Product product) {
        if (product == null) return null;

        return product.deprecate();
    }
}
