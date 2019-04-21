package actions;

import models.BaseModel;
import models.Order;
import models.Refund;

public class RefundActions {
    public static Refund createRefund(Order order) {
        return createPartialRefund(order, order.getProduct().getPrice());
    }

    public static Refund createPartialRefund(Order order, Integer amount) {
        if (order == null) return null;

        Refund refund = new Refund()
                .setAmount(amount) // TODO Think about discounts and actual paid price??
                .setOrder(order)
                .setStatus(BaseModel.ACTIVE)
                .store();

        UserActions.addToBalance(order.getUser(), refund.getAmount());

        order.setStatus(BaseModel.REFUNDED).store();

        return refund;
    }

}
