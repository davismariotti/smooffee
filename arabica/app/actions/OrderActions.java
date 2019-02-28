package actions;

import models.Order;
import models.Product;
import models.User;

public class OrderActions {

    public Order createOrder(User user, Product product, String location, String notes) {
        Order order = new Order();
        order.setProduct(product);
        order.setUser(user);
        order.setLocation(location);
        order.setNotes(notes);
        order.save();
        order.refresh();

        return order;
    }

    public Order updateOrder() {
        return null;
    }

    public boolean deprecateOrder(Order order) {
        order.deprecate();
        return true;
    }
}
