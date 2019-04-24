package models;

import io.ebean.Finder;
import io.ebean.Query;
import io.ebean.annotation.NotNull;
import utilities.QLFinder;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

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

    @ManyToMany
    @JoinTable(
            name = "order_modifier_orders",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "order_modifier_id"))
    private Set<OrderModifier> orderModifiers;

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

    public Set<OrderModifier> getOrderModifiers() {
        return orderModifiers;
    }

    public Order setOrderModifiers(Set<OrderModifier> orderModifiers) {
        this.orderModifiers = orderModifiers;
        return this;
    }

    public static List<Order> findByOrganizationId(Long organizationId) {
        return find.query().where()
                .eq("user.organization.id", organizationId)
                .findList();
    }

    public static class OrderFinder extends Finder<Long, Order> {
        OrderFinder() {
            super(Order.class);
        }
    }

    public static Query<Order> findWithParamters(QLFinder finder) {
        return (finder == null) ? find.query() : finder.build(Order.class);
    }

}
