package environment;

import models.DeliveryPeriod;
import models.Organization;
import models.Product;
import models.User;
import services.AuthenticationService;

public class Setup {

    public static Organization defaultOrganization;
    public static DeliveryPeriod defaultDeliveryPeriod;
    public static User defaultSysadmin;
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
                .setRole(0)
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

    public static void createDefaultProduct() {
        defaultProduct = new Product()
                .setName("Latte")
                .setDescription("Lattes are good")
                .setPrice(600)
                .setOrganization(defaultOrganization)
                .store();
    }
}
