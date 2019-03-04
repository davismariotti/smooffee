package graphql;

import actions.ProductActions;
import models.Product;
import services.authorization.Permission;

public class QLProduct {
    public static class Query {
        public ProductEntry read(Long id) {
            Permission.check(Permission.THIS_ORGANIZATION); // TODO
            Product product = Product.find.byId(id);
            if (product == null) {
                return null;
            }
            return new ProductEntry(product);
        }
    }

    public static class Mutation {
        public ProductEntry create(Long organizationId, ProductInput productInput) {
            Permission.check(Permission.ALL); // TODO
            return new ProductEntry(ProductActions.createProduct(organizationId, productInput.getName(), productInput.getDescription(), productInput.getPrice()));
        }

        public ProductEntry update(Long id, ProductInput productInput) {
            // TODO Check permissions
            return new ProductEntry(ProductActions.updateProduct(id, productInput.getName(), productInput.getDescription(), productInput.getPrice()));
        }
    }

    public static class ProductInput {
        private String name;
        private String description;
        private Integer price;

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public Integer getPrice() {
            return price;
        }

        public void setPrice(Integer price) {
            this.price = price;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static class ProductEntry {
        private Long id;
        private Long organizationId;
        private String name;
        private String description;
        private Integer price;

        public ProductEntry(Product product) {
            this.id = product.getId();
            this.name = product.getName();
            this.organizationId = product.getOrganization().getId();
            this.description = product.getDescription();
            this.price = product.getPrice();
        }

        public Long getOrganizationId() {
            return organizationId;
        }

        public void setOrganizationId(Long organizationId) {
            this.organizationId = organizationId;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public Integer getPrice() {
            return price;
        }

        public void setPrice(Integer price) {
            this.price = price;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
