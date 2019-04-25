package actions;

import models.*;
import utilities.QLException;

import java.util.Set;

public class OrderActions {

    public static Order createOrder(User user, DeliveryPeriod deliveryPeriod, Product product, String location, String notes, String recipient, Set<OrderModifier> orderModifiers) {
        if (user == null || deliveryPeriod == null || product == null || location == null || recipient == null) return null;

        // Check user funds
        int balance = user.getBalance();
        if (balance < product.getPrice()) throw new QLException("Insufficient funds");

        // Check if order might break max queue size restraint
        if (deliveryPeriod.getMaxQueueSize() > 0) {
            int currentQueueSize = Organization.currentQueueSize(user.getOrganization().getId(), deliveryPeriod.getId());
            if (currentQueueSize >= deliveryPeriod.getMaxQueueSize()) throw new QLException("Max queue size reached");
        }

        user.setBalance(balance - product.getPrice());

        Order order = new Order()
                .setProduct(product)
                .setDeliveryPeriod(deliveryPeriod)
                .setUser(user)
                .setLocation(location)
                .setNotes(notes)
                .setRecipient(recipient)
                .setOrderModifiers(orderModifiers)
                .setStatus(BaseModel.ACTIVE)
                .store();

        user.save();

        return order;
    }

    public static Order updateOrder(Order order, DeliveryPeriod deliveryPeriod, Product product, String location, String notes, String recipient, Set<OrderModifier> orderModifiers) {
        if (order == null || deliveryPeriod == null || product == null || location == null || notes == null || recipient == null) return null;

        return order
                .setDeliveryPeriod(deliveryPeriod)
                .setProduct(product)
                .setRecipient(recipient)
                .setNotes(notes)
                .setLocation(location)
                .setOrderModifiers(orderModifiers)
                .store();
    }

    public static Order cancelOrder(Order order) {
        return order.setStatus(BaseModel.CANCELLED).deprecate();
    }
}
