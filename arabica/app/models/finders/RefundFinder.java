package models.finders;

import io.ebean.Finder;
import models.Refund;

public class RefundFinder extends Finder<Long, Refund> {

    public RefundFinder() {
        super(Refund.class);
    }
}
