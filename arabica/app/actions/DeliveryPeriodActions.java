package actions;

import models.BaseModel;
import models.DeliveryPeriod;
import models.Organization;
import utilities.QLException;

public class DeliveryPeriodActions {

    public static DeliveryPeriod createDeliveryPeriod(Long organizationId, Integer classPeriod) {
        Organization organization = Organization.find.byId(organizationId);
        if (organization == null) throw new QLException("Organization not found");

        return new DeliveryPeriod()
                .setClassPeriod(classPeriod)
                .setStatus(BaseModel.ACTIVE)
                .store();
    }

    public static DeliveryPeriod updateDeliveryPeriod(Long deliveryPeriodId, Integer classPeriod, Integer status) {
        DeliveryPeriod deliveryPeriod = DeliveryPeriod.find.byId(deliveryPeriodId);
        if (deliveryPeriod == null) throw new QLException("Delivery Period not found");

        return deliveryPeriod.setClassPeriod(classPeriod)
                .setStatus(status)
                .store();
    }

    public static boolean deprecateDeliveryPeriod(DeliveryPeriod deliveryPeriod) {
        deliveryPeriod.deprecate();
        return true;
    }
}
