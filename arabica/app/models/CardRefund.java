package models;

import io.ebean.Finder;
import io.ebean.Query;
import io.ebean.annotation.NotNull;
import utilities.QLFinder;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "cardrefund")
public class CardRefund extends BaseModel {

    public static final CardRefundFinder find = new CardRefundFinder();

    @NotNull
    private Card card;

    @NotNull
    private Payment payment;

    public Card getCard() {
        return card;
    }

    public CardRefund setCard(Card card) {
        this.card = card;
        return this;
    }

    public Payment getPayment() {
        return payment;
    }

    public CardRefund setPayment(Payment payment) {
        this.payment = payment;
        return this;
    }


    public static class CardRefundFinder extends Finder<Long, CardRefund> {
        public CardRefundFinder() {
            super(CardRefund.class);
        }
    }

    public static Query<CardRefund> findWithParamters(QLFinder finder) {
        return (finder == null) ? find.query() : finder.build(CardRefund.class);
    }

}
