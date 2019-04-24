package actions;

import models.BaseModel;
import models.OrderModifier;
import models.Organization;

public class OrderModifierActions {

    public static OrderModifier createOrderModifier(Organization organization, String name) {
        if (organization == null || name == null) return null;

        return new OrderModifier()
                .setName(name)
                .setOrganization(organization)
                .setStatus(BaseModel.ACTIVE)
                .store();
    }

    public static OrderModifier updateOrderModifier(OrderModifier orderModifier, String name) {
        if (orderModifier == null || name == null) return null;

        return orderModifier.setName(name).store();
    }

    public static OrderModifier deprecateOrderModifier(OrderModifier deliveryPeriod) {
        return deliveryPeriod.deprecate();
    }
}
