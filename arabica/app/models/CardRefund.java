package models;

import io.ebean.annotation.NotNull;
import models.finders.CardRefundFinder;

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

}
