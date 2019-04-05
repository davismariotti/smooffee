package models;

import io.ebean.Finder;
import io.ebean.Query;
import io.ebean.annotation.NotNull;
import utilities.QLFinder;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "payment")
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

    public Payment setAmount(int amount) {
        this.amount = amount;
        return this;
    }

    public User getUser() {
        return user;
    }

    public Payment setUser(User user) {
        this.user = user;
        return this;
    }

    public Card getCard() {
        return card;
    }

    public Payment setCard(Card card) {
        this.card = card;
        return this;
    }

    public String getType() {
        return type;
    }

    public Payment setType(String type) {
        this.type = type;
        return this;
    }

    public static class PaymentFinder extends Finder<Long, Payment> {
        public PaymentFinder() {
            super(Payment.class);
        }
    }

    public static Query<Payment> findWithParamters(QLFinder finder) {
        return (finder == null) ? find.query() : finder.build(Payment.class);
    }
}
