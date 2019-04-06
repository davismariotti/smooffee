package models;

import io.ebean.Finder;
import io.ebean.Query;
import utilities.QLFinder;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "delivery_period")
public class DeliveryPeriod extends BaseModel {

    public static final DeliveryPeriodFinder find = new DeliveryPeriodFinder();

    private Integer classPeriod;

    @ManyToOne(cascade = CascadeType.ALL)
    private Organization organization;

    public Organization getOrganization() {
        return organization;
    }

    public DeliveryPeriod setOrganization(Organization organization) {
        this.organization = organization;
        return this;
    }

    public Integer getClassPeriod() {
        return classPeriod;
    }

    public DeliveryPeriod setClassPeriod(Integer classPeriod) {
        this.classPeriod = classPeriod;
        return this;
    }

    public static class DeliveryPeriodFinder extends Finder<Long, DeliveryPeriod> {
        public DeliveryPeriodFinder() {
            super(DeliveryPeriod.class);
        }
    }

    public static List<DeliveryPeriod> findDeliveryPeriodsByOrganizationId(Long organizationId, List<Integer> statuses) {
        return find.query().where()
                .eq("organization_id", organizationId)
                .in("status", statuses)
                .findList();
    }

    public static Query<DeliveryPeriod> findWithParamters(QLFinder finder) {
        return (finder == null) ? find.query() : finder.build(DeliveryPeriod.class);
    }

}
