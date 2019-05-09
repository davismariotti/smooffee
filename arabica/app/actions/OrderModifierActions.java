package actions;

import models.BaseModel;
import models.OrderModifier;
import models.Organization;

public class OrderModifierActions {

    public static OrderModifier createOrderModifier(Organization organization, String name, Integer additionalCost) {
        if (organization == null || name == null || additionalCost == null) return null;

        return new OrderModifier()
                .setName(name)
                .setOrganization(organization)
                .setAdditionalCost(additionalCost)
                .setStatus(BaseModel.ACTIVE)
                .store();
    }

    public static OrderModifier updateOrderModifier(OrderModifier orderModifier, String name, Integer additionalCost) {
        if (orderModifier == null || name == null || additionalCost == null) return null;

        return orderModifier.setName(name).setAdditionalCost(additionalCost).store();
    }

    public static OrderModifier deprecateOrderModifier(OrderModifier deliveryPeriod) {
        return deliveryPeriod.deprecate();
    }
}
