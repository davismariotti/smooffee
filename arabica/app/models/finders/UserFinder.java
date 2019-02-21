package models.finders;

import io.ebean.Finder;
import models.User;

public class UserFinder extends Finder<Long, User> {

    public UserFinder() {
        super(User.class);
    }
}
