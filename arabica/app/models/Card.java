package models;

import io.ebean.Finder;
import io.ebean.annotation.NotNull;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "card")
public class Card extends BaseModel {

    public static final CardFinder find = new CardFinder();

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    private String token;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }


    public static class CardFinder extends Finder<Long, Card> {
        public CardFinder() {
            super(Card.class);
        }
    }

}
