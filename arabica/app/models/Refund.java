package models;

import io.ebean.annotation.NotNull;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "refund")
public class Refund extends BaseModel {

    @NotNull
    private int amount;

    @NotNull
    private Order order;

    @NotNull
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
