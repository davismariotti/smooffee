package models.finders;

import io.ebean.Finder;
import models.Card;

public class CardFinder extends Finder<Long, Card> {

    public CardFinder() {
        super(Card.class);
    }
}
