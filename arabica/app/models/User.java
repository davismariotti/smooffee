package models;

import io.ebean.annotation.NotNull;
import models.finders.UserFinder;
import services.authorization.Role;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

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
    @NotNull
    private Integer balance;

    public Integer getBalance() {
        return balance;
    }

    public User setBalance(Integer balance) {
        this.balance = balance;
        return this;
    }

    public String getFirebaseUserId() {
        return firebaseUserId;
    }

    public User setFirebaseUserId(String firebaseUserId) {
        this.firebaseUserId = firebaseUserId;
        return this;
    }

    public String getLastname() {
        return lastname;
    }

    public User setLastname(String lastname) {
        this.lastname = lastname;
        return this;
    }

    public Organization getOrganization() {
        return organization;
    }

    public User setOrganization(Organization organization) {
        this.organization = organization;
        return this;
    }

    public Date getLastLoggedIn() {
        return lastLoggedIn;
    }

    public User setLastLoggedIn(Date lastLoggedIn) {
        this.lastLoggedIn = lastLoggedIn;
        return this;
    }

    public int getRoleInteger() {
        return role;
    }

    public Role getRole() {
        return Role.fromInt(role);
    }

    public User setRole(int role) {
        this.role = role;
        return this;
    }

    public String getFirstname() {
        return firstname;
    }

    public User setFirstname(String firstname) {
        this.firstname = firstname;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public User setEmail(String email) {
        this.email = email;
        return this;
    }

    public static User findByFirebaseUid(String firebaseUserId) {
        return find.query().where().eq("firebase_user_id", firebaseUserId).findOne();
    }

    public static List<User> findByOrganizationId(Long organizationId, List<Integer> statuses) {
        return find.query().where()
                .eq("organization_id", organizationId)
                .in("status", statuses)
                .findList();
    }
}
