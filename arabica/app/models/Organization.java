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

    private String secretApiKey;
    private String publishableApiKey;

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

    public String getSecretApiKey() {
        return secretApiKey;
    }

    public Organization setSecretApiKey(String secretApiKey) {
        this.secretApiKey = secretApiKey;
        return this;
    }

    public String getPublisableApiKey() {
        return publishableApiKey;
    }

    public Organization setPublishableApiKey(String publishableApiKey) {
        this.publishableApiKey = publishableApiKey;
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
