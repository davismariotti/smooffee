package models;

import io.ebean.Finder;
import io.ebean.annotation.NotNull;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "refund")
public class Refund extends BaseModel {

    public static final RefundFinder find = new RefundFinder();

    @NotNull
    private int amount;

    @NotNull
    private Order order;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

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

    public User getUser() {
        return user;
    }

    public Refund setUser(User user) {
        this.user = user;
        return this;
    }

    public static class RefundFinder extends Finder<Long, Refund> {
        public RefundFinder() {
            super(Refund.class);
        }
    }

}
