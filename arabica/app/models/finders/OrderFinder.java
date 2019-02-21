package models.finders;

import io.ebean.Finder;
import models.Order;

public class OrderFinder extends Finder<Long, Order> {

    public OrderFinder() {
        super(Order.class);
    }
}
