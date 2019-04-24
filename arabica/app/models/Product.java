package models;

import io.ebean.Finder;
import io.ebean.Query;
import io.ebean.annotation.NotNull;
import utilities.QLFinder;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "product")
public class Product extends BaseModel {

    public static final ProductFinder find = new ProductFinder();

    @NotNull
    private String name;

    @NotNull
    private int price;

    private String description;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    private Organization organization;

    @ManyToMany
    @JoinTable(
            name = "order_modifier_products",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "order_modifier_id"))
    private Set<OrderModifier> orderModifiers;

    public Set<OrderModifier> getOrderModifiers() {
        return orderModifiers;
    }

    public Product setOrderModifiers(Set<OrderModifier> orderModifiers) {
        this.orderModifiers = orderModifiers;
        return this;
    }

    public Organization getOrganization() {
        return organization;
    }

    public Product setOrganization(Organization organization) {
        this.organization = organization;
        return this;
    }

    public String getName() {
        return name;
    }

    public Product setName(String name) {
        this.name = name;
        return this;
    }

    public int getPrice() {
        return price;
    }

    public Product setPrice(int price) {
        this.price = price;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Product setDescription(String description) {
        this.description = description;
        return this;
    }

    public static List<Product> findProductsByOrganizationId(Long organizationId, List<Integer> statuses) {
        return find.query().where()
                .eq("organization_id", organizationId)
                .in("status", statuses)
                .findList();
    }

    public static class ProductFinder extends Finder<Long, Product> {
        ProductFinder() {
            super(Product.class);
        }
    }

    public static Query<Product> findWithParameters(QLFinder finder) {
        return (finder == null) ? find.query() : finder.build(Product.class);
    }

}
