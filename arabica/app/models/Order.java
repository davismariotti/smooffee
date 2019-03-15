package models;

import io.ebean.annotation.NotNull;
import models.finders.OrderFinder;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.List;

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
    private String location;

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

    public static List<Order> findByOrganizationId(Long organizationId) {
        return find.query().where()
                .eq("organization_id", organizationId)
                .findList();
    }

    public static List<Order> findByOrganizationId(Long organizationId, List<Integer> statuses) {
        return find.query().where()
                .eq("user.organization.id", organizationId)
                .in("status", statuses)
                .findList();
    }

}
