package models;

import io.ebean.Finder;
import io.ebean.Query;
import io.ebean.annotation.NotNull;
import services.authorization.Role;
import utilities.QLFinder;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
public class User extends BaseModel {

    public static final UserFinder find = new UserFinder();

    @NotNull
    @Column(name = "firstname")
    private String firstName;

    @NotNull
    @Column(name = "lastname")
    private String lastName;

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

    private String stripeCustomerId;

    @OneToMany(mappedBy = "user")
    private Set<Order> orders;

    @OneToMany(mappedBy = "user")
    private Set<Payment> payments;

    public Set<Order> getOrders() {
        return orders;
    }

    public Set<Payment> getPayments() {
        return payments;
    }

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

    public String getLastName() {
        return lastName;
    }

    public User setLastName(String lastName) {
        this.lastName = lastName;
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

    public String getFirstName() {
        return firstName;
    }

    public User setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public User setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getStripeCustomerId() {
        return this.stripeCustomerId;
    }

    public User setStripeCustomerId(String stripeCustomerId) {
        this.stripeCustomerId = stripeCustomerId;
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


    public static class UserFinder extends Finder<Long, User> {
        UserFinder() {
            super(User.class);
        }
    }

    public static Query<User> findWithParamters(QLFinder finder) {
        return (finder == null) ? find.query() : finder.build(User.class);
    }
}
