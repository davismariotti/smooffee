package graphql;

import actions.OrderActions;
import models.Order;
import utilities.QLException;

public class QLOrder {
    public static class Query {
        public OrderEntry read(Long id) {
            Order order = Order.find.byId(id);
            if (order == null) throw new QLException("Order not found");
            return new OrderEntry(order);
        }
    }

    public static class Mutation {
        public OrderEntry create(String userId, OrderInput orderInput) {
            return new OrderEntry(OrderActions.createOrder(userId, orderInput.getProductId(), orderInput.getLocation(), orderInput.getNotes()));
        }
    }

    public static class OrderEntry {
        private Long id;
        private String location;
        private String notes;
        private QLProduct.ProductEntry product;

        public OrderEntry(Order order) {
            this.id = order.getId();
            this.location = order.getLocation();
            this.notes = order.getNotes();
            this.product = new QLProduct.ProductEntry(order.getProduct());
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }

        public QLProduct.ProductEntry getProduct() {
            return product;
        }

        public void setProduct(QLProduct.ProductEntry product) {
            this.product = product;
        }
    }

    public static class OrderInput {
        private String location;
        private String notes;
        private Long productId;

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }
    }
}
