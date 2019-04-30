package services.authorization;

import models.Organization;
import models.User;
import utilities.ThreadStorage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Permission {

    // SPECIAL PERMISSIONS
    public static final int ALL = -2;
    public static final int NONE = -1;

    // THIS USER
    public static final int THIS_USER_INFO_READ     = 100;
    public static final int THIS_USER_INFO_WRITE    = 101;
    public static final int THIS_USER_PAYMENT_READ  = 102;
    public static final int THIS_USER_PAYMENT_WRITE = 103;
    public static final int THIS_USER_CARD_READ     = 104;
    public static final int THIS_USER_CARD_WRITE    = 105;
    public static final int THIS_USER_ORDER_READ    = 106;
    public static final int THIS_USER_ORDER_WRITE   = 107;

    // OTHER USER
    // OTHER_USER must be exactly 100 more than THIS_USER entry of same type
    public static final int OTHER_USER_INFO_READ        = THIS_USER_INFO_READ       + 100;
    public static final int OTHER_USER_INFO_WRITE       = THIS_USER_INFO_WRITE      + 100;
    public static final int OTHER_USER_PAYMENT_READ     = THIS_USER_PAYMENT_READ    + 100;
    public static final int OTHER_USER_PAYMENT_WRITE    = THIS_USER_PAYMENT_WRITE   + 100;
    public static final int OTHER_USER_CARD_READ        = THIS_USER_CARD_READ       + 100;
    public static final int OTHER_USER_CARD_WRITE       = THIS_USER_CARD_WRITE      + 100;
    public static final int OTHER_USER_ORDER_READ       = THIS_USER_ORDER_READ      + 100;
    public static final int OTHER_USER_ORDER_WRITE      = THIS_USER_ORDER_WRITE     + 100;

    // THIS ORGANIZATION
    public static final int THIS_ORGANIZATION_READ                  = 300;
    public static final int THIS_ORGANIZATION_ORDERS_READ           = 301;
    public static final int THIS_ORGANIZATION_ORDERS_WRITE          = 302;
    public static final int THIS_ORGANIZATION_SETTINGS_READ         = 303;
    public static final int THIS_ORGANIZATION_SETTINGS_WRITE        = 304;
    public static final int THIS_ORGANIZATION_REPORTS_READ          = 305;
    public static final int THIS_ORGANIZATION_CHANGE_USER_ROLE      = 306;
    public static final int THIS_ORGANIZATION_PRODUCTS_READ         = 307;
    public static final int THIS_ORGANIZATION_USERS_READ            = 308;
    public static final int THIS_ORGANIZATION_DELIVERY_PERIODS_READ = 309;
    public static final int THIS_ORGANIZATION_CREATE_PAYMENT_REFUND = 310;
    public static final int THIS_ORGANIZATION_CREATE_ORDER_REFUND   = 311;


    // ALL OTHER PERMISSIONS
    public static final int ORGANIZATION_CREATE = 400;
    public static final int ORGANIZATION_LIST = 401;

    private static final Map<Role, List<Integer>> permissionAssignments = new HashMap<Role, List<Integer>>() {{
        put(Role.SYSADMIN, new ArrayList<Integer>() {{
            add(Permission.ALL);
        }});
        put(Role.ADMIN, new ArrayList<Integer>() {{
            add(Permission.THIS_USER_INFO_READ);
            add(Permission.THIS_USER_INFO_WRITE);
            add(Permission.THIS_USER_PAYMENT_READ);
            add(Permission.THIS_USER_PAYMENT_WRITE);
            add(Permission.THIS_USER_ORDER_READ);
            add(Permission.THIS_USER_ORDER_WRITE);
            add(Permission.THIS_USER_CARD_READ);
            add(Permission.THIS_USER_CARD_WRITE);

            add(Permission.OTHER_USER_INFO_READ);
            add(Permission.OTHER_USER_INFO_WRITE);
            add(Permission.OTHER_USER_PAYMENT_READ);
            add(Permission.OTHER_USER_ORDER_READ);
            add(Permission.OTHER_USER_ORDER_WRITE);

            add(Permission.THIS_ORGANIZATION_READ);
            add(Permission.THIS_ORGANIZATION_ORDERS_READ);
            add(Permission.THIS_ORGANIZATION_ORDERS_WRITE);
            add(Permission.THIS_ORGANIZATION_SETTINGS_READ);
            add(Permission.THIS_ORGANIZATION_SETTINGS_WRITE);
            add(Permission.THIS_ORGANIZATION_CHANGE_USER_ROLE);
            add(Permission.THIS_ORGANIZATION_PRODUCTS_READ);
            add(Permission.THIS_ORGANIZATION_USERS_READ);
            add(Permission.THIS_ORGANIZATION_DELIVERY_PERIODS_READ);
            add(Permission.THIS_ORGANIZATION_CREATE_PAYMENT_REFUND);
            add(Permission.THIS_ORGANIZATION_CREATE_ORDER_REFUND);

            add(Permission.ORGANIZATION_LIST);
        }});
        put(Role.SUPERVISOR, new ArrayList<Integer>() {{
            add(Permission.THIS_USER_INFO_READ);
            add(Permission.THIS_USER_INFO_WRITE);
            add(Permission.THIS_USER_PAYMENT_READ);
            add(Permission.THIS_USER_PAYMENT_WRITE);
            add(Permission.THIS_USER_ORDER_READ);
            add(Permission.THIS_USER_ORDER_WRITE);
            add(Permission.THIS_USER_CARD_READ);
            add(Permission.THIS_USER_CARD_WRITE);

            add(Permission.OTHER_USER_INFO_READ);
            add(Permission.OTHER_USER_ORDER_READ);
            add(Permission.OTHER_USER_ORDER_WRITE);

            add(Permission.THIS_ORGANIZATION_READ);
            add(Permission.THIS_ORGANIZATION_ORDERS_READ);
            add(Permission.THIS_ORGANIZATION_ORDERS_WRITE);
            add(Permission.THIS_ORGANIZATION_SETTINGS_READ);
            add(Permission.THIS_ORGANIZATION_PRODUCTS_READ);
            add(Permission.THIS_ORGANIZATION_DELIVERY_PERIODS_READ);

            add(Permission.ORGANIZATION_LIST);
        }});
        put(Role.EMPLOYEE, new ArrayList<Integer>() {{
            add(Permission.THIS_USER_INFO_READ);
            add(Permission.THIS_USER_INFO_WRITE);
            add(Permission.THIS_USER_PAYMENT_READ);
            add(Permission.THIS_USER_PAYMENT_WRITE);
            add(Permission.THIS_USER_ORDER_READ);
            add(Permission.THIS_USER_ORDER_WRITE);
            add(Permission.THIS_USER_CARD_READ);
            add(Permission.THIS_USER_CARD_WRITE);

            add(Permission.OTHER_USER_INFO_READ);
            add(Permission.OTHER_USER_ORDER_READ);

            add(Permission.THIS_ORGANIZATION_READ);
            add(Permission.THIS_ORGANIZATION_ORDERS_READ);
            add(Permission.THIS_ORGANIZATION_ORDERS_WRITE);
            add(Permission.THIS_ORGANIZATION_SETTINGS_READ);
            add(Permission.THIS_ORGANIZATION_PRODUCTS_READ);
            add(Permission.THIS_ORGANIZATION_DELIVERY_PERIODS_READ);

            add(Permission.ORGANIZATION_LIST);
        }});
        put(Role.CUSTOMER, new ArrayList<Integer>() {{
            add(Permission.THIS_USER_INFO_READ);
            add(Permission.THIS_USER_INFO_WRITE);
            add(Permission.THIS_USER_PAYMENT_READ);
            add(Permission.THIS_USER_PAYMENT_WRITE);
            add(Permission.THIS_USER_ORDER_READ);
            add(Permission.THIS_USER_ORDER_WRITE);
            add(Permission.THIS_USER_CARD_READ);
            add(Permission.THIS_USER_CARD_WRITE);

            add(Permission.THIS_ORGANIZATION_READ);
            add(Permission.THIS_ORGANIZATION_PRODUCTS_READ);
            add(Permission.THIS_ORGANIZATION_DELIVERY_PERIODS_READ);

            add(Permission.ORGANIZATION_LIST);
        }});
        put(Role.ANONYMOUS, new ArrayList<Integer>() {{
            add(Permission.NONE);
        }});
    }};

    public static boolean checkUserPermission(User user, int permission, AuthorizationContext context) {
        // Get role
        Role userRole = user.getRole();

        List<Integer> userPermissions = permissionAssignments.get(userRole);
        if (userPermissions.contains(Permission.NONE)) return false;
        if (userPermissions.contains(Permission.ALL)) return true; // User can access anything, only sysadmin

        // THIS_USER
        if (permission >= 100 && permission <= 199) {
            if (context == null) return false; // Context needed

            if (userPermissions.contains(permission)) {
                // Check if the context user matches the calling user
                if (user.equals(context.getUser())) return true; // Access granted
            }

            // Otherwise check if the user has the corresponding OTHER_USER permission
            if (userPermissions.contains(permission + 100)) {
                // Check if the context user's organization matches the calling user's organization
                User contextUser = context.getUser();
                if (contextUser != null && user.getOrganization().equals(contextUser.getOrganization())) return true; // Access granted
            }
        }
        // OTHER_USER
        else if (permission >= 200 && permission <= 299) {
            if (context == null) return false; // Context needed

            if (userPermissions.contains(permission)) {
                // Check if the context user's organization matches the calling user's organization
                User contextUser = context.getUser();
                if (contextUser != null && user.getOrganization().equals(contextUser.getOrganization())) return true; // Access granted
            }
        }
        // THIS_ORGANIZATION and all others (normal permissions
        else if (permission >= 300 && permission <= 399) {
            if (context == null) return false; // Context needed

            if (userPermissions.contains(permission)) {
                // Check if the context organization matches the calling user's organization
                Organization contextOrganization = context.getOrganization();
                if (user.getOrganization().equals(contextOrganization)) return true; // Access granted
            }
        }
        // All other permissions that don't rely on context
        else {
            if (userPermissions.contains(permission)) return true; // Access granted
        }

        // Deny access if userPermissions doesn't contain permission or context is invalid for operation
        return false;
    }

    public static void check(int permission) {
        check(permission, null);
    }

    public static void check(int permission, AuthorizationContext context) {
        ThreadStorage.get().hasCheckedPermissions = true;

        // Get uid
        User user = User.findByFirebaseUid(ThreadStorage.get().uid);
        if (user == null) throw new AccessDeniedException("User is null");

        boolean result = checkUserPermission(user, permission, context);
        if (!result) throw new AccessDeniedException(String.format("User does not have permission %d, or context is not allowed", permission));
    }

    public static void ignore() {
        ThreadStorage.get().hasCheckedPermissions = true;
    }

    public static class AccessDeniedException extends RuntimeException {
        public AccessDeniedException() {
            super();
        }

        public AccessDeniedException(String message) {
            super(message);
        }
    }

}
