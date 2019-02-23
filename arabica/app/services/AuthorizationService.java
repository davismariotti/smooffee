package services;

import models.User;
import utilities.ThreadStorage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AuthorizationService {

    public enum Role {
        SYSADMIN("Sysadmin", 0),
        ADMIN("Admin", 1),
        EMPLOYEE("Employee", 2),
        CUSTOMER("Customer", 3),
        ANONYMOUS("Anonymous", -1);

        private static final Map<Integer, Role> intToTypeMap = new HashMap<>();

        private final String name;
        private final int value;

        Role(String name, int value) {
            this.name = name;
            this.value = value;
        }

        public String getName() {
            return this.name;
        }

        static {
            for (Role type : Role.values()) {
                intToTypeMap.put(type.value, type);
            }
        }

        public static Role fromInt(int i) {
            Role type = intToTypeMap.get(i);
            if (type == null)
                return Role.ANONYMOUS;
            return type;
        }
    }

    public enum Permission {
        NONE,
        THIS_USER,
        OTHER_USERS,
        ORDERS,
        THIS_ORGANIZATION,
        ALL
    }

    public enum Action {
        READ_USER,
        WRITE_USER,
        MAKE_ORDER,
        READ_ORDER,
        READ_ORGANIZATION,
        WRITE_ORGANIZATION
    }

    private static final Map<Role, List<Permission>> permissionAssignments = new HashMap<Role, List<Permission>>() {{
        put(Role.SYSADMIN, new ArrayList<Permission>() {{
            add(Permission.ALL);
        }});
        put(Role.ADMIN, new ArrayList<Permission>() {{
            add(Permission.THIS_ORGANIZATION);
            add(Permission.OTHER_USERS);
            add(Permission.THIS_USER);
            add(Permission.ORDERS);
        }});
        put(Role.EMPLOYEE, new ArrayList<Permission>() {{
            add(Permission.ORDERS);
            add(Permission.OTHER_USERS);
            add(Permission.THIS_USER);
        }});
        put(Role.CUSTOMER, new ArrayList<Permission>() {{
            add(Permission.THIS_USER);
        }});
        put(Role.ANONYMOUS, new ArrayList<Permission>() {{
            add(Permission.NONE);
        }});
    }};

    private static final Map<Permission, List<Action>> actionPermissions = new HashMap<Permission, List<Action>>() {{
        put(Permission.THIS_USER, new ArrayList<Action>() {{
            add(Action.MAKE_ORDER);
            add(Action.READ_USER);
            add(Action.WRITE_USER);
        }}); // TODO
    }};

    public static void check(Permission permission, Action action) {
        // Get uid
        String uid = ThreadStorage.get().uid;
        User user = User.findByFirebaseUid(uid);
        if (user == null) {
            throw new AccessDeniedException();
        }
        // Get role
        Role userRole = user.getRole();

        List<Permission> userPermissions = permissionAssignments.get(userRole);
        if (userPermissions.contains(Permission.NONE)) throw new AccessDeniedException();
        if (userPermissions.contains(Permission.ALL)) return; // User can access anything


    }

    public static class AccessDeniedException extends RuntimeException {}


}
