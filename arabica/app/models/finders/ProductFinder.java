package models.finders;

import io.ebean.Finder;
import models.Product;

public class ProductFinder extends Finder<Long, Product> {

    public ProductFinder() {
        super(Product.class);
    }
}
