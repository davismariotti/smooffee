package environment;

import models.DeliveryPeriod;
import models.Organization;
import models.Product;
import models.User;
import services.AuthenticationService;
import services.authorization.Role;

public class Setup {

    public static Organization defaultOrganization;
    public static DeliveryPeriod defaultDeliveryPeriod;
    public static User defaultSysadmin;
    public static User defaultCustomer;
    public static Product defaultProduct;

    public static void createDefaultOrganization() {
        defaultOrganization = new Organization()
                .setName("Default")
                .store();
    }

    public static void createDefaultDeliveryPeriod() {
        defaultDeliveryPeriod = new DeliveryPeriod()
                .setOrganization(defaultOrganization)
                .setClassPeriod(1)
                .store();
    }

    public static void createDefaultSysadmin() {
        defaultSysadmin = new User()
                .setRole(Role.SYSADMIN.getValue())
                .setEmail("davismariotti@gmail.com")
                .setFirstname("Davis")
                .setLastname("Mariotti")
                .setBalance(0)
                .setFirebaseUserId("davismariotti@gmail.com")
                .setOrganization(defaultOrganization)
                .store();
        FakeApplication.authToken.push("davismariotti@gmail.com");
        AuthenticationService.mockMap.put("davismariotti@gmail.com", "davismariotti@gmail.com");
    }

    public static void createDefaultCustomer() {
        defaultCustomer = new User()
                .setRole(Role.CUSTOMER.getValue())
                .setOrganization(defaultOrganization)
                .setBalance(0)
                .setEmail("customer@test.com")
                .setFirstname("Default")
                .setLastname("Customer")
                .setFirebaseUserId("customer@test.com")
                .store();
        AuthenticationService.mockMap.put(defaultCustomer.getFirebaseUserId(), defaultCustomer.getFirebaseUserId());
    }

    public static void createDefaultProduct() {
        defaultProduct = new Product()
                .setName("Latte")
                .setDescription("Lattes are good")
                .setPrice(600)
                .setOrganization(defaultOrganization)
                .store();
    }
}
