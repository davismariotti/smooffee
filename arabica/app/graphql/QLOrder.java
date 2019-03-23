package graphql;

import actions.OrderActions;
import actions.RefundActions;
import models.*;
import services.authorization.AuthorizationContext;
import services.authorization.Permission;
import utilities.QLException;

import java.util.List;
import java.util.stream.Collectors;

public class QLOrder {
    public static class Query {
        public OrderEntry read(Long id) {
            Order order = Order.find.byId(id);
            if (order == null) throw new QLException("Order not found");
            Permission.check(Permission.THIS_ORGANIZATION_ORDERS_READ, new AuthorizationContext(order.getUser().getOrganization()));

            return new OrderEntry(order);
        }

        public List<OrderEntry> list(Long organizationId, List<Integer> statuses) {
            Organization organization = Organization.find.byId(organizationId);
            if (organization == null) throw new QLException("Organization not found.");
            Permission.check(Permission.THIS_ORGANIZATION_ORDERS_READ, new AuthorizationContext(organization));

            List<Order> orders = Order.findByOrganizationId(organizationId, statuses);

            return orders.stream().map(OrderEntry::new).collect(Collectors.toList());
        }
    }

    public static class Mutation {
        public OrderEntry create(String userId, OrderInput orderInput) {
            User user = User.findByFirebaseUid(userId);
            DeliveryPeriod deliveryPeriod = DeliveryPeriod.find.byId(orderInput.deliveryPeriodId);
            Product product = Product.find.byId(orderInput.getProductId());
            if (user == null) throw new QLException("User not found.");
            if (deliveryPeriod == null) throw new QLException("Delivery Period not found");
            if (product == null) throw new QLException("Product not found");

            Permission.check(Permission.THIS_USER_ORDER_WRITE, new AuthorizationContext(user));

            return new OrderEntry(OrderActions.createOrder(user, deliveryPeriod, product, orderInput.getLocation(), orderInput.getNotes(), orderInput.getRecipient()));
        }

        public OrderEntry updateStatus(Long orderId, int status) {
            Order order = Order.find.byId(orderId);
            if (order == null) throw new QLException("Order not found");
            Permission.check(Permission.THIS_ORGANIZATION_ORDERS_WRITE, new AuthorizationContext(order.getUser().getOrganization()));

            order.setStatus(status).store();

            return new OrderEntry(order);
        }

        public OrderEntry cancelOrder(Long orderId) {
            Order order = Order.find.byId(orderId);
            if (order == null) throw new QLException("Order not found");
            Permission.check(Permission.THIS_USER_ORDER_WRITE, new AuthorizationContext(order.getUser()));

            // If an order is in progress or has already been completed, then it cannot be cancelled
            if (order.getStatus() != BaseModel.ACTIVE) {
                // Employee/Admin can override
                try {
                    Permission.check(Permission.THIS_ORGANIZATION_ORDERS_WRITE);
                } catch (Permission.AccessDeniedException e) { // Convert exception
                    throw new QLException("Order cannot be cancelled at this time.");
                }
            }

            order.setStatus(BaseModel.CANCELLED).deprecate();

            // Refund order
            RefundActions.createRefund(order);

            return new OrderEntry(order);
        }
    }

    public static class OrderEntry extends QLEntry {
        private String location;
        private String notes;
        private String recipient;
        private QLProduct.ProductEntry product;
        private QLDeliveryPeriod.DeliveryPeriodEntry deliveryPeriod;

        public OrderEntry(Order order) {
            super(order);
            this.location = order.getLocation();
            this.notes = order.getNotes();
            this.product = new QLProduct.ProductEntry(order.getProduct());
            this.recipient = order.getRecipient();
            this.deliveryPeriod = new QLDeliveryPeriod.DeliveryPeriodEntry(order.getDeliveryPeriod());
        }

        public String getLocation() {
            return location;
        }

        public String getRecipient() {
            return recipient;
        }

        public String getNotes() {
            return notes;
        }

        public QLProduct.ProductEntry getProduct() {
            return product;
        }

        public QLDeliveryPeriod.DeliveryPeriodEntry getDeliveryPeriod() {
            return deliveryPeriod;
        }
    }

    public static class OrderInput extends QLInput {
        private String location;
        private String notes;
        private Long productId;
        private String recipient;
        private Long deliveryPeriodId;

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

        public String getRecipient() {
            return recipient;
        }

        public void setRecipient(String recipient) {
            this.recipient = recipient;
        }

        public Long getDeliveryPeriodId() {
            return deliveryPeriodId;
        }

        public void setDeliveryPeriodId(Long deliveryPeriodId) {
            this.deliveryPeriodId = deliveryPeriodId;
        }
    }
}
