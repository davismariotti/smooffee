package models;

import io.ebean.Finder;
import io.ebean.Query;
import io.ebean.annotation.NotNull;
import utilities.QLFinder;

import javax.persistence.*;

@Entity
@Table(name = "refund")
public class Refund extends BaseModel {

    public static final RefundFinder find = new RefundFinder();

    @NotNull
    private int amount;

    @NotNull
    @OneToOne
    private Order order;

    public int getAmount() {
        return amount;
    }

    public Refund setAmount(int amount) {
        this.amount = amount;
        return this;
    }

    public Order getOrder() {
        return order;
    }

    public Refund setOrder(Order order) {
        this.order = order;
        return this;
    }

    public static class RefundFinder extends Finder<Long, Refund> {
        RefundFinder() {
            super(Refund.class);
        }
    }

    public static Query<Refund> findWithParamters(QLFinder finder) {
        return (finder == null) ? find.query() : finder.build(Refund.class);
    }

    public static Refund findByOrderId(Long orderId) {
        return find.query().where().eq("order_id", orderId).findOne();
    }

}
