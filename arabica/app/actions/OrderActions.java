package actions;

import models.Order;
import models.Product;
import models.User;
import utilities.QLException;

public class OrderActions {

    public static Order createOrder(String userId, Long productId, String location, String notes) {
        User user = User.findByFirebaseUid(userId);
        Product product = Product.find.byId(productId);

        if (user == null) throw new QLException("User not found");
        if (product == null) throw new QLException("Product not found");

        // Check user funds
        int balance = user.getBalance();
        if (balance < product.getPrice()) throw new QLException("Insufficient funds");

        user.setBalance(balance - product.getPrice());

        Order order = new Order();
        order.setProduct(product);
        order.setUser(user);
        order.setLocation(location);
        order.setNotes(notes);
        order.save();

        user.save();

        return order;
    }

    public static boolean deprecateOrder(Order order) {
        order.deprecate();
        return true;
    }
}
