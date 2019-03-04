package models.finders;

import io.ebean.Finder;
import models.CardRefund;

public class CardRefundFinder extends Finder<Long, CardRefund> {

    public CardRefundFinder() {
        super(CardRefund.class);
    }
}
