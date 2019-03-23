package models;

import io.ebean.Finder;
import io.ebean.annotation.NotNull;

import javax.persistence.*;

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

    private String stripeChargeId;

    @OneToOne(mappedBy = "payment")
    private CardRefund cardRefund;

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

    public String getStripeChargeId() {
        return stripeChargeId;
    }

    public Payment setStripeChargeId(String stripeChargeId) {
        this.stripeChargeId = stripeChargeId;
        return this;
    }


    public CardRefund getCardRefund() {
        return cardRefund;
    }

    public Payment setCardRefund(CardRefund cardRefund) {
        this.cardRefund = cardRefund;
        return this;
    }

    public static class PaymentFinder extends Finder<Long, Payment> {
        public PaymentFinder() {
            super(Payment.class);
        }
    }
}
