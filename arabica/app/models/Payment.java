package models;

import io.ebean.annotation.NotNull;
import models.finders.PaymentFinder;

import javax.persistence.CascadeType;
import javax.persistence.ManyToOne;

public class Payment extends BaseModel {

    public static final PaymentFinder find = new PaymentFinder();

    @NotNull
    private int amount;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    private Card card;

    @NotNull
    private String type;

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
