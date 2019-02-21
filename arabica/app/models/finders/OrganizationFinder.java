package models.finders;

import io.ebean.Finder;
import models.Organization;

public class OrganizationFinder extends Finder<Long, Organization> {

    public OrganizationFinder() {
        super(Organization.class);
    }
}
