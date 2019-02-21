package models;

import models.finders.OrganizationFinder;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "organization")
public class Organization extends BaseModel {

    public static final OrganizationFinder find = new OrganizationFinder();

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
