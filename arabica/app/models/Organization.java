package models;

import io.ebean.Finder;
import io.ebean.Query;
import utilities.QLFinder;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "organization")
public class Organization extends BaseModel {

    public static final OrganizationFinder find = new OrganizationFinder();

    private String name;

    @OneToMany(mappedBy = "organization")
    private List<Product> products;

    private String apiKey;

    public List<Product> getProducts() {
        return products;
    }

    public String getName() {
        return name;
    }

    public Organization setName(String name) {
        this.name = name;
        return this;
    }

    public String getApiKey() {
        return apiKey;
    }

    public Organization setApiKey(String apiKey) {
        this.apiKey = apiKey;
        return this;
    }


    public static class OrganizationFinder extends Finder<Long, Organization> {
        public OrganizationFinder() {
            super(Organization.class);
        }
    }

    public static Query<Organization> findWithParamters(QLFinder finder) {
        return (finder == null) ? find.query() : finder.build(Organization.class);
    }
}
