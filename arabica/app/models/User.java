package models;

import io.ebean.annotation.NotNull;
import models.finders.UserFinder;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "users")
public class User extends BaseModel {

    public static final UserFinder find = new UserFinder();

    @NotNull
    private String firstname;

    @NotNull
    private String lastname;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    private Organization organization;

    @NotNull
    private String email;

    private Date lastLoggedIn;

    private int role;

    private String firebaseUserId;

    public String getFirebaseUserId() {
        return firebaseUserId;
    }

    public void setFirebaseUserId(String firebaseUserId) {
        this.firebaseUserId = firebaseUserId;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public Date getLastLoggedIn() {
        return lastLoggedIn;
    }

    public void setLastLoggedIn(Date lastLoggedIn) {
        this.lastLoggedIn = lastLoggedIn;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public static User findByFirebaseUid(String firebaseUserId) {
        return find.query().where().eq("firebase_user_id", firebaseUserId).findOne();
    }
}
