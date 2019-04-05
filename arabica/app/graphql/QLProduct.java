package graphql;

import actions.ProductActions;
import models.Organization;
import models.Product;
import services.authorization.AuthorizationContext;
import services.authorization.Permission;
import utilities.QLException;
import utilities.QLFinder;

import java.util.List;
import java.util.stream.Collectors;

public class QLProduct {
    public static class Query {
        public ProductEntry read(Long id) {
            Product product = Product.find.byId(id);
            if (product == null) throw new QLException("Product not found.");
            Permission.check(Permission.THIS_ORGANIZATION_PRODUCTS_READ, new AuthorizationContext(product.getOrganization()));

            return new ProductEntry(product);
        }

        public List<ProductEntry> list(Long organizationId, QLFinder parameters) {
            Organization organization = Organization.find.byId(organizationId);
            if (organization == null) throw new QLException("Organization not found.");
            Permission.check(Permission.THIS_ORGANIZATION_PRODUCTS_READ, new AuthorizationContext(organization));

            List<Product> products = Product.findWithParameters(parameters)
                    .where()
                    .eq("organization_id", organizationId)
                    .findList();

            return products.stream().map(ProductEntry::new).collect(Collectors.toList());
        }
    }

    public static class Mutation {
        public ProductEntry create(Long organizationId, ProductInput productInput) {
            Organization organization = Organization.find.byId(organizationId);
            if (organization == null) throw new QLException("Organization not found.");
            Permission.check(Permission.THIS_ORGANIZATION_SETTINGS_WRITE, new AuthorizationContext(organization));

            return new ProductEntry(ProductActions.createProduct(organizationId, productInput.getName(), productInput.getDescription(), productInput.getPrice()));
        }

        public ProductEntry update(Long productId, ProductInput productInput) {
            Product product = Product.find.byId(productId);
            if (product == null) throw new QLException("Product not found.");
            Permission.check(Permission.THIS_ORGANIZATION_SETTINGS_WRITE, new AuthorizationContext(product.getOrganization()));

            return new ProductEntry(ProductActions.updateProduct(productId, productInput.getName(), productInput.getDescription(), productInput.getPrice(), productInput.getStatus()));
        }

        public ProductEntry updateStatus(Long orderId, int status) {
            Product product = Product.find.byId(orderId);
            if (product == null) throw new QLException("Product not found");
            Permission.check(Permission.THIS_ORGANIZATION_SETTINGS_WRITE, new AuthorizationContext(product.getOrganization()));

            product.setStatus(status).store();

            return new ProductEntry(product);
        }
    }

    public static class ProductInput extends QLInput {
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

    public static class ProductEntry extends QLEntry {
        private Long organizationId;
        private String name;
        private String description;
        private Integer price;

        public ProductEntry(Product product) {
            super(product);
            this.name = product.getName();
            this.organizationId = product.getOrganization().getId();
            this.description = product.getDescription();
            this.price = product.getPrice();
        }

        public Long getOrganizationId() {
            return organizationId;
        }

        public String getDescription() {
            return description;
        }

        public Integer getPrice() {
            return price;
        }

        public String getName() {
            return name;
        }
    }
}
