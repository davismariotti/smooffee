package services;

import models.Organization;
import models.User;
import org.junit.BeforeClass;
import org.junit.Test;
import services.authorization.AuthorizationContext;
import services.authorization.Permission;
import services.authorization.Role;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;


public class PermissionTest {

    private static Organization randomOrganization;
    private static User randomUser;
    private static Organization randomOrganization2;
    private static User randomUser2;

    @BeforeClass
    public static void setupUsers() {
        randomOrganization = new Organization()
                .setName("Name")
                .setId(10L);

        randomUser = new User()
                .setFirebaseUserId("random_user_id")
                .setOrganization(randomOrganization)
                .setId(1L);

        randomOrganization2 = new Organization()
                .setName("Name2")
                .setId(11L);

        randomUser2 = new User()
                .setFirebaseUserId("random_user_id2")
                .setOrganization(randomOrganization2)
                .setId(2L);
    }

    @Test
    public void testAnonymous() {
        User anonymous = new User()
                .setFirebaseUserId("anonymous_user_id")
                .setRole(Role.ANONYMOUS.getValue());

        assertFalse(Permission.checkUserPermission(anonymous, Permission.THIS_USER_INFO_READ, new AuthorizationContext(anonymous)));
    }

    @Test
    public void testSysadmin() {
        Organization organization = new Organization()
                .setName("Name")
                .setId(3L);
        User sysadmin = new User()
                .setFirebaseUserId("sysadmin_user_id")
                .setRole(Role.SYSADMIN.getValue())
                .setOrganization(organization)
                .setId(4L);

        assertTrue(Permission.checkUserPermission(sysadmin, Permission.THIS_USER_INFO_READ, new AuthorizationContext(sysadmin)));
        assertTrue(Permission.checkUserPermission(sysadmin, Permission.THIS_ORGANIZATION_PRODUCTS_READ, new AuthorizationContext(sysadmin.getOrganization())));
        assertTrue(Permission.checkUserPermission(sysadmin, Permission.ORGANIZATION_CREATE, null));
    }

    @Test
    public void testCustomer() {
        Organization organization = new Organization()
                .setName("Name")
                .setId(3L);
        User customer = new User()
                .setFirebaseUserId("customer_user_id")
                .setRole(Role.CUSTOMER.getValue())
                .setOrganization(organization)
                .setId(4L);


        assertTrue(Permission.checkUserPermission(customer, Permission.THIS_USER_INFO_READ, new AuthorizationContext(customer)));
        assertFalse(Permission.checkUserPermission(customer, Permission.THIS_USER_INFO_READ, new AuthorizationContext(randomUser)));
        assertFalse(Permission.checkUserPermission(customer, Permission.OTHER_USER_INFO_READ, new AuthorizationContext(customer)));
        assertFalse(Permission.checkUserPermission(customer, Permission.THIS_ORGANIZATION_USERS_READ, new AuthorizationContext(customer.getOrganization())));
        assertFalse(Permission.checkUserPermission(customer, Permission.ORGANIZATION_CREATE, null));
        assertFalse(Permission.checkUserPermission(customer, Permission.THIS_ORGANIZATION_PRODUCTS_READ, new AuthorizationContext(randomOrganization)));
    }

    @Test
    public void testEmployee() {
        Organization organization = new Organization()
                .setName("Name")
                .setId(3L);
        User employee = new User()
                .setFirebaseUserId("employee_user_id")
                .setRole(Role.EMPLOYEE.getValue())
                .setOrganization(organization)
                .setId(4L);

        User otherUserInOrganization = new User()
                .setFirebaseUserId("employee_user_id2")
                .setRole(Role.EMPLOYEE.getValue())
                .setOrganization(organization)
                .setId(5L);

        assertTrue(Permission.checkUserPermission(employee, Permission.THIS_USER_INFO_READ, new AuthorizationContext(employee))); // Read their own info
        assertTrue(Permission.checkUserPermission(employee, Permission.OTHER_USER_INFO_READ, new AuthorizationContext(otherUserInOrganization))); // Read another user's info in same organization
        assertTrue(Permission.checkUserPermission(employee, Permission.OTHER_USER_ORDER_READ, new AuthorizationContext(otherUserInOrganization))); // Read another user's info in another organization
        assertFalse(Permission.checkUserPermission(employee, Permission.OTHER_USER_INFO_READ, new AuthorizationContext(randomUser))); // Read another user's info in another organization
        assertFalse(Permission.checkUserPermission(employee, Permission.OTHER_USER_ORDER_READ, new AuthorizationContext(randomUser))); // Read another user's info in another organization
        assertFalse(Permission.checkUserPermission(employee, Permission.THIS_ORGANIZATION_USERS_READ, new AuthorizationContext(employee.getOrganization())));
        assertFalse(Permission.checkUserPermission(employee, Permission.ORGANIZATION_CREATE, null));
    }

    @Test
    public void testAdmin() {
        Organization organization = new Organization()
                .setName("Name")
                .setId(3L);
        User admin = new User()
                .setFirebaseUserId("admin_user_id")
                .setRole(Role.ADMIN.getValue())
                .setOrganization(organization)
                .setId(4L);

        User otherUserInOrganization = new User()
                .setFirebaseUserId("employee_user_id2")
                .setRole(Role.EMPLOYEE.getValue())
                .setOrganization(organization)
                .setId(5L);

        assertTrue(Permission.checkUserPermission(admin, Permission.THIS_USER_INFO_READ, new AuthorizationContext(admin))); // Read their own info
        assertTrue(Permission.checkUserPermission(admin, Permission.OTHER_USER_INFO_READ, new AuthorizationContext(otherUserInOrganization))); // Read another user's info in same organization
        assertTrue(Permission.checkUserPermission(admin, Permission.OTHER_USER_ORDER_READ, new AuthorizationContext(otherUserInOrganization))); // Read another user's info in another organization
        assertFalse(Permission.checkUserPermission(admin, Permission.OTHER_USER_INFO_READ, new AuthorizationContext(randomUser))); // Read another user's info in another organization
        assertFalse(Permission.checkUserPermission(admin, Permission.OTHER_USER_ORDER_READ, new AuthorizationContext(randomUser))); // Read another user's info in another organization
        assertTrue(Permission.checkUserPermission(admin, Permission.THIS_ORGANIZATION_USERS_READ, new AuthorizationContext(admin.getOrganization())));
        assertTrue(Permission.checkUserPermission(admin, Permission.THIS_ORGANIZATION_SETTINGS_WRITE, new AuthorizationContext(admin.getOrganization())));
        assertFalse(Permission.checkUserPermission(admin, Permission.ORGANIZATION_CREATE, null));
    }
}
