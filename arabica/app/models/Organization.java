package models;

import io.ebean.Finder;
import io.ebean.Query;
import utilities.QLFinder;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "organization")
public class Organization extends BaseModel {

    public static final OrganizationFinder find = new OrganizationFinder();

    private String name;

    @OneToMany(mappedBy = "organization")
    private Set<Product> products;

    @OneToMany(mappedBy = "organization")
    private Set<User> users;

    @OneToMany(mappedBy = "organization")
    private Set<DeliveryPeriod> deliveryPeriods;

    private String secretApiKey;
    private String publishableApiKey;

    public Set<Product> getProducts() {
        return products;
    }

    public Set<User> getUsers() {
        return users;
    }

    public Set<DeliveryPeriod> getDeliveryPeriods() {
        return deliveryPeriods;
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
        OrganizationFinder() {
            super(Organization.class);
        }
    }

    public static int currentQueueSize(Long organizationId, Long deliveryPeriodId) {

        return Order.find.query().where()
                .and()
                    .eq("user.organization.id", organizationId)
                    .eq("deliveryPeriod.id", deliveryPeriodId)
                    .or()
                        .eq("status", BaseModel.ACTIVE)
                        .eq("status", BaseModel.IN_PROGRESS)
                    .endOr()
                .endAnd()
                .findCount();
    }

    public static Query<Organization> findWithParamters(QLFinder finder) {
        return (finder == null) ? find.query() : finder.build(Organization.class);
    }
}
