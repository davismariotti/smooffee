package models;

import io.ebean.Finder;
import io.ebean.Query;
import io.ebean.annotation.NotNull;
import utilities.QLFinder;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.List;

import static io.ebean.Expr.eq;
import static io.ebean.Expr.or;

@Entity
@Table(name = "orders")
public class Order extends BaseModel {

    public static final OrderFinder find = new OrderFinder();

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    private Product product;

    @NotNull
    private String recipient;

    @NotNull
    private String location;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    private DeliveryPeriod deliveryPeriod;

    private String notes;

    public User getUser() {
        return user;
    }

    public Order setUser(User user) {
        this.user = user;
        return this;
    }

    public Product getProduct() {
        return product;
    }

    public Order setProduct(Product product) {
        this.product = product;
        return this;
    }

    public String getLocation() {
        return location;
    }

    public Order setLocation(String location) {
        this.location = location;
        return this;
    }

    public String getNotes() {
        return notes;
    }

    public Order setNotes(String notes) {
        this.notes = notes;
        return this;
    }

    public String getRecipient() {
        return recipient;
    }

    public Order setRecipient(String recipient) {
        this.recipient = recipient;
        return this;
    }

    public DeliveryPeriod getDeliveryPeriod() {
        return deliveryPeriod;
    }

    public Order setDeliveryPeriod(DeliveryPeriod deliveryPeriod) {
        this.deliveryPeriod = deliveryPeriod;
        return this;
    }

    public static List<Order> findByOrganizationId(Long organizationId) {
        return find.query().where()
                .eq("user.organization.id", organizationId)
                .findList();
    }

    public static class OrderFinder extends Finder<Long, Order> {
        public OrderFinder() {
            super(Order.class);
        }
    }

    public static Query<Order> findWithParamters(QLFinder finder) {
        return (finder == null) ? find.query() : finder.build(Order.class);
    }

}
