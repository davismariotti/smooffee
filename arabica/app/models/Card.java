package models;

import models.finders.CardFinder;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "card")
public class Card extends BaseModel {

    public static final CardFinder find = new CardFinder();

    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}
