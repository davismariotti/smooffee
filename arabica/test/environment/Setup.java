package environment;

import models.Organization;
import models.User;
import services.AuthenticationService;

public class Setup {

    public static Organization defaultOrganization;
    public static User defaultSysadmin;

    public static void createDefaultOrganization() {
        defaultOrganization = new Organization()
                .setName("Default")
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
}
