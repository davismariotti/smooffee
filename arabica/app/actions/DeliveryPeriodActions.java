package actions;

import models.BaseModel;
import models.DeliveryPeriod;
import models.Organization;

public class DeliveryPeriodActions {

    public static DeliveryPeriod createDeliveryPeriod(Organization organization, Integer classPeriod, String monday, String tuesday, String wednesday, String thursday, String friday) {
        if (organization == null || classPeriod == null) return null;



        return new DeliveryPeriod()
                .setClassPeriod(classPeriod)
                .setOrganization(organization)
                .setMonday(monday == null       || monday.equals("")    ? null : monday)
                .setTuesday(tuesday == null     || tuesday.equals("")   ? null : tuesday)
                .setWednesday(wednesday == null || wednesday.equals("") ? null : wednesday)
                .setThursday(thursday == null   || thursday.equals("")  ? null : thursday)
                .setFriday(friday == null       || friday.equals("")    ? null : friday)
                .setStatus(BaseModel.ACTIVE)
                .store();
    }

    public static DeliveryPeriod updateDeliveryPeriod(DeliveryPeriod deliveryPeriod, Integer classPeriod, String monday, String tuesday, String wednesday, String thursday, String friday) {
        if (deliveryPeriod == null || classPeriod == null) return null;

        return deliveryPeriod.setClassPeriod(classPeriod)
                .setMonday(monday == null       || monday.equals("")    ? null : monday)
                .setTuesday(tuesday == null     || tuesday.equals("")   ? null : tuesday)
                .setWednesday(wednesday == null || wednesday.equals("") ? null : wednesday)
                .setThursday(thursday == null   || thursday.equals("")  ? null : thursday)
                .setFriday(friday == null       || friday.equals("")    ? null : friday)
                .store();
    }

    public static DeliveryPeriod deprecateDeliveryPeriod(DeliveryPeriod deliveryPeriod) {
        return deliveryPeriod.deprecate();
    }
}
