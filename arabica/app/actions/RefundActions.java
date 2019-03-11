package actions;

import models.Order;
import models.Refund;
import models.User;
import utilities.QLException;

public class RefundActions {
    public static Refund createRefund(Long orderId) {
        Order order = Order.find.byId(orderId);
        if (order == null) throw new QLException("Order not found");

        Refund refund = new Refund()
                .setAmount(order.getProduct().getPrice()) // TODO Think about discounts and actual paid price??
                .setOrder(order)
                .setUser(order.getUser())
                .store();

        User user = order.getUser();
        user.setBalance(user.getBalance() + refund.getAmount()).store();

        return refund;
    }

}
