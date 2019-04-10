package models;

import io.ebean.Finder;
import io.ebean.Query;
import io.ebean.annotation.NotNull;
import utilities.QLFinder;

import javax.persistence.*;

@Entity
@Table(name = "payment")
public class Payment extends BaseModel {

    public static final PaymentFinder find = new PaymentFinder();

    public static final String CASH = "cash";
    public static final String CARD = "card";

    @NotNull
    private int amount;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    @NotNull
    private String type;

    private String stripeChargeId;
    private String stripeCardId;
    private String stripeRefundId;

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

    public String getStripeCardId() {
        return stripeCardId;
    }

    public Payment setStripeCardId(String stripeCardId) {
        this.stripeCardId = stripeCardId;
        return this;
    }

    public String getStripeRefundId() {
        return stripeRefundId;
    }

    public Payment setStripeRefundId(String stripeRefundId) {
        this.stripeRefundId = stripeRefundId;
        return this;
    }

    public String getType() {
        return type;
    }

    public Payment setType(String type) {
        this.type = type;
        return this;
    }

    public String getStripeChargeId() {
        return stripeChargeId;
    }

    public Payment setStripeChargeId(String stripeChargeId) {
        this.stripeChargeId = stripeChargeId;
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
