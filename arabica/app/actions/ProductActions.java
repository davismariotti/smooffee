package actions;

import models.Product;

public class ProductActions {
    public static Product createProduct(String name, String description, Integer price) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.save();
        product.refresh();
        return product;
    }

    public static Product updateProduct(Long productId, String name, String description, Integer price) {
        Product product = Product.find.byId(productId);
        if (product == null) {
            return null;
        }
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
