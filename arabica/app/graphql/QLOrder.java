package graphql;

import actions.OrderActions;
import actions.RefundActions;
import models.*;
import services.authorization.AuthorizationContext;
import services.authorization.Permission;
import utilities.QLException;
import utilities.QLFinder;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class QLOrder {
    public static class Query {
        public OrderEntry read(Long id) {
            Order order = Order.find.byId(id);
            if (order == null) throw new QLException("Order not found");
            Permission.check(Permission.THIS_ORGANIZATION_ORDERS_READ, new AuthorizationContext(order.getUser().getOrganization()));

            return new OrderEntry(order);
        }

        public List<OrderEntry> list(Long organizationId, QLFinder parameters) {
            Organization organization = Organization.find.byId(organizationId);
            if (organization == null) throw new QLException("Organization not found.");
            Permission.check(Permission.THIS_ORGANIZATION_ORDERS_READ, new AuthorizationContext(organization));

            List<Order> orders = Order.findWithParamters(parameters)
                    .where()
                    .eq("user.organization.id", organizationId)
                    .findList();

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

            Set<OrderModifier> orderModifiers = new HashSet<>();
            if (orderInput.getOrderModifiers() != null) {
                for (Long orderModifierId : orderInput.getOrderModifiers()) {
                    OrderModifier orderModifier = OrderModifier.find.byId(orderModifierId);
                    if (orderModifier == null) throw new QLException("Order Modifier not found.");
                    orderModifiers.add(orderModifier);
                }
            }

            Permission.check(Permission.THIS_USER_ORDER_WRITE, new AuthorizationContext(user));

            return new OrderEntry(OrderActions.createOrder(user, deliveryPeriod, product, orderInput.getLocation(), orderInput.getNotes(), orderInput.getRecipient(), orderModifiers));
        }

        public OrderEntry updateStatus(Long orderId, String status) {
            Order order = Order.find.byId(orderId);
            if (order == null) throw new QLException("Order not found");

            if (status.equals(BaseModel.CANCELLED_STR)) {
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

                order = OrderActions.cancelOrder(order);

                return new OrderEntry(order);
            } else if (status.equals(BaseModel.REFUNDED_STR)) {
                throw new QLException("Use createRefund to refund an order");
            } else { // All other status updates
                Permission.check(Permission.THIS_ORGANIZATION_ORDERS_WRITE, new AuthorizationContext(order.getUser().getOrganization()));

                order.setStatus(BaseModel.statusStringToInt(status)).store();

                return new OrderEntry(order);
            }
        }

        public RefundEntry createRefund(Long orderId) {
            Order order = Order.find.byId(orderId);
            if (order == null) throw new QLException("Order not found");

            Permission.check(Permission.THIS_ORGANIZATION_CREATE_ORDER_REFUND, new AuthorizationContext(order.getUser().getOrganization()));

            return new RefundEntry(RefundActions.createRefund(order));
        }
    }

    public static class OrderEntry extends QLEntry {
        private Order order;
        private String location;
        private String notes;
        private String recipient;
        private QLProduct.ProductEntry product;
        private QLDeliveryPeriod.DeliveryPeriodEntry deliveryPeriod;
        private RefundEntry refund;
        private List<QLOrderModifier.OrderModifierEntry> orderModifiers;

        public OrderEntry(Order order) {
            super(order);
            this.order = order;
            this.location = order.getLocation();
            this.notes = order.getNotes();
            this.recipient = order.getRecipient();
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
            if (product == null) product = new QLProduct.ProductEntry(order.getProduct());
            return product;
        }

        public QLDeliveryPeriod.DeliveryPeriodEntry getDeliveryPeriod() {
            if (deliveryPeriod == null) deliveryPeriod = new QLDeliveryPeriod.DeliveryPeriodEntry(order.getDeliveryPeriod());
            return deliveryPeriod;
        }

        public RefundEntry getRefund() {
            if (refund == null) {
                Refund refundModel = Refund.findByOrderId(order.getId());
                if (refundModel != null) {
                    refund = new RefundEntry(refundModel);
                }
            }
            return refund;
        }

        public List<QLOrderModifier.OrderModifierEntry> getOrderModifiers() {
            if (orderModifiers == null) orderModifiers = order.getOrderModifiers().stream().map(QLOrderModifier.OrderModifierEntry::new).collect(Collectors.toList());
            return orderModifiers;
        }
    }

    public static class OrderInput {
        private String location;
        private String notes;
        private Long productId;
        private String recipient;
        private Long deliveryPeriodId;

        private List<Long> orderModifiers;

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

        public List<Long> getOrderModifiers() {
            return orderModifiers;
        }

        public void setOrderModifiers(List<Long> orderModifiers) {
            this.orderModifiers = orderModifiers;
        }
    }

    public static class RefundEntry extends QLEntry {
        private Integer amount;

        public RefundEntry(Refund refund) {
            super(refund);
            this.amount = refund.getAmount();
        }

        public Integer getAmount() {
            return amount;
        }
    }
}
