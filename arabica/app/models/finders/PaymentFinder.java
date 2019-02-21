package models.finders;

import io.ebean.Finder;
import models.Payment;

public class PaymentFinder extends Finder<Long, Payment> {

    public PaymentFinder() {
        super(Payment.class);
    }
}
