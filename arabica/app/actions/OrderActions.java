package actions;

import models.*;
import utilities.QLException;

public class OrderActions {

    public static Order createOrder(String userId, Long deliveryPeriodId, Long productId, String location, String notes, String recipient) {
        User user = User.findByFirebaseUid(userId);
        DeliveryPeriod deliveryPeriod = DeliveryPeriod.find.byId(deliveryPeriodId);
        Product product = Product.find.byId(productId);

        if (user == null) throw new QLException("User not found");
        if (deliveryPeriod == null) throw new QLException("Delivery Period not found");
        if (product == null) throw new QLException("Product not found");

        // Check user funds
        int balance = user.getBalance();
        if (balance < product.getPrice()) throw new QLException("Insufficient funds");

        user.setBalance(balance - product.getPrice());

        Order order = new Order()
                .setProduct(product)
                .setDeliveryPeriod(deliveryPeriod)
                .setUser(user)
                .setLocation(location)
                .setNotes(notes)
                .setRecipient(recipient)
                .setStatus(BaseModel.ACTIVE)
                .store();

        user.save();

        return order;
    }

    public static Order updateOrder(Long orderId, Long deliveryPeriodId, Long productId, String location, String notes, String recipient) {
        Order order = Order.find.byId(orderId);
        Product product = Product.find.byId(productId);
        DeliveryPeriod deliveryPeriod = DeliveryPeriod.find.byId(deliveryPeriodId);

        if (order == null) throw new QLException("Order not found");
        if (deliveryPeriod == null) throw new QLException("Delivery Period not found");
        if (product == null) throw new QLException("Product not found");

        return order
                .setDeliveryPeriod(deliveryPeriod)
                .setProduct(product)
                .setRecipient(recipient)
                .setNotes(notes)
                .setLocation(location)
                .store();
    }

    public static boolean deprecateOrder(Order order) {
        order.deprecate();
        return true;
    }
}
