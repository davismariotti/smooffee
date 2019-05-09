package models;

import io.ebean.Finder;
import io.ebean.Query;
import io.ebean.annotation.NotNull;
import utilities.QLFinder;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "order_modifier")
public class OrderModifier extends BaseModel {

    public static final OrderModifierFinder find = new OrderModifierFinder();

    @NotNull
    private String name;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    private Organization organization;

    @ManyToMany(mappedBy = "orderModifiers")
    private Set<Product> products;

    private Integer additionalCost;

    private Set<Product> getProducts() {
        return products;
    }

    public String getName() {
        return name;
    }

    public OrderModifier setName(String name) {
        this.name = name;
        return this;
    }

    public Organization getOrganization() {
        return organization;
    }

    public OrderModifier setOrganization(Organization organization) {
        this.organization = organization;
        return this;
    }

    public Integer getAdditionalCost() {
        return additionalCost;
    }

    public OrderModifier setAdditionalCost(Integer additionalCost) {
        this.additionalCost = additionalCost;
        return this;
    }

    public static class OrderModifierFinder extends Finder<Long, OrderModifier> {
        OrderModifierFinder() {
            super(OrderModifier.class);
        }
    }
    public static Query<OrderModifier> findWithParamters(QLFinder finder) {
        return (finder == null) ? find.query() : finder.build(OrderModifier.class);
    }

}
