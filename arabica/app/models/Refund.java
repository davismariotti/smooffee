package models;

import io.ebean.annotation.NotNull;
import models.finders.RefundFinder;

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

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


}
