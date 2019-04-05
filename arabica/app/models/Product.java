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
        public ProductFinder() {
            super(Product.class);
        }
    }

    public static Query<Product> findWithParameters(QLFinder finder) {
        return (finder == null) ? find.query() : finder.build(Product.class);
    }

}
