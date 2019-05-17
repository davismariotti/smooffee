package actions;

import models.*;
import utilities.QLException;

import java.util.Set;

public class OrderActions {

    public static Order createOrder(User user, DeliveryPeriod deliveryPeriod, Product product, String location, String notes, String recipient, String size, Set<OrderModifier> orderModifiers) {
        if (user == null || deliveryPeriod == null || product == null || location == null || recipient == null || size == null) return null;

        // Check user funds
        int balance = user.getBalance();
        if (balance < product.getPrice()) throw new QLException("Insufficient funds");

        // Check if order might break max queue size restraint
        if (deliveryPeriod.getMaxQueueSize() > 0) {
            int currentQueueSize = Organization.currentQueueSize(user.getOrganization().getId(), deliveryPeriod.getId());
            if (currentQueueSize >= deliveryPeriod.getMaxQueueSize()) throw new QLException("Max queue size reached");
        }

        // Get total cost of the order
        int totalCost = product.getPrice() + orderModifiers.stream().mapToInt(OrderModifier::getAdditionalCost).sum();


        user.setBalance(balance - product.getPrice());

        return new Order()
                .setProduct(product)
                .setDeliveryPeriod(deliveryPeriod)
                .setUser(user)
                .setLocation(location)
                .setNotes(notes)
                .setRecipient(recipient)
                .setSize(size)
                .setOrderModifiers(orderModifiers)
                .setTotalCost(totalCost)
                .setStatus(BaseModel.ACTIVE)
                .store();
    }

    public static Order updateOrder(Order order, DeliveryPeriod deliveryPeriod, Product product, String location, String notes, String recipient, String size, Set<OrderModifier> orderModifiers) {
        if (order == null || deliveryPeriod == null || product == null || location == null || notes == null || recipient == null || size == null) return null;

        return order
                .setDeliveryPeriod(deliveryPeriod)
                .setProduct(product)
                .setRecipient(recipient)
                .setNotes(notes)
                .setLocation(location)
                .setSize(size)
                .setOrderModifiers(orderModifiers)
                .store();
    }

    public static Order cancelOrder(Order order) {
        return order.setStatus(BaseModel.CANCELLED).deprecate();
    }
}
