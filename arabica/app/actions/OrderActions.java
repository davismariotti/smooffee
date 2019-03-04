package actions;

import models.Order;
import models.Product;
import models.User;
import utilities.QLException;

public class OrderActions {

    public Order createOrder(String userId, Long productId, String location, String notes) {
        User user = User.findByFirebaseUid(userId);
        Product product = Product.find.byId(productId);

        if (user == null) throw new QLException("User not found");
        if (product == null) throw new QLException("Product not found");

        Order order = new Order();
        order.setProduct(product);
        order.setUser(user);
        order.setLocation(location);
        order.setNotes(notes);
        order.save();
        order.refresh();

        return order;
    }

    public boolean deprecateOrder(Order order) {
        order.deprecate();
        return true;
    }
}
