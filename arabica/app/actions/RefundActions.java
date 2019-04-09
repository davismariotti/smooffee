package actions;

import models.BaseModel;
import models.Order;
import models.Refund;
import models.User;
import utilities.QLException;

public class RefundActions {
    public static Refund createRefund(Order order) {
        if (order == null) return null;

        Refund refund = new Refund()
                .setAmount(order.getProduct().getPrice()) // TODO Think about discounts and actual paid price??
                .setOrder(order)
                .setUser(order.getUser())
                .setStatus(BaseModel.ACTIVE)
                .store();

        UserActions.addToBalance(order.getUser(), refund.getAmount());

        return refund;
    }

}
