package actions;

import models.BaseModel;
import models.DeliveryPeriod;
import models.Organization;

public class DeliveryPeriodActions {

    public static DeliveryPeriod createDeliveryPeriod(Organization organization, Integer classPeriod) {
        if (organization == null || classPeriod == null) return null;

        return new DeliveryPeriod()
                .setClassPeriod(classPeriod)
                .setOrganization(organization)
                .setStatus(BaseModel.ACTIVE)
                .store();
    }

    public static DeliveryPeriod updateDeliveryPeriod(DeliveryPeriod deliveryPeriod, Integer classPeriod, Integer status) {
        if (deliveryPeriod == null || classPeriod == null || status == null) return null;

        return deliveryPeriod.setClassPeriod(classPeriod)
                .setStatus(status)
                .store();
    }

    public static DeliveryPeriod deprecateDeliveryPeriod(DeliveryPeriod deliveryPeriod) {
        return deliveryPeriod.deprecate();
    }
}
