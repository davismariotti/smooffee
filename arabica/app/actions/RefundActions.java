package actions;

import models.Order;
import models.Refund;
import utilities.QLException;

public class RefundActions {
    public static Refund createRefund(Long orderId) {
        Order order = Order.find.byId(orderId);
        if (order == null) throw new QLException("Order not found");

        Refund refund = new Refund()
                .setAmount(order.getProduct().getPrice()) // TODO Think about discounts??
                .setOrder(order)
                .setUser(order.getUser())
                .store();

        return refund;
    }

}
