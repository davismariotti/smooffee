package services.authorization;

import models.User;
import utilities.ThreadStorage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public enum Permission {
    NONE,
    THIS_USER,
    OTHER_USERS,
    THIS_ORGANIZATION,
    ALL;

    private static final Map<Role, List<Permission>> permissionAssignments = new HashMap<Role, List<Permission>>() {{
        put(Role.SYSADMIN, new ArrayList<Permission>() {{
            add(Permission.ALL);
        }});
        put(Role.ADMIN, new ArrayList<Permission>() {{
            add(Permission.THIS_ORGANIZATION);
            add(Permission.OTHER_USERS);
            add(Permission.THIS_USER);
        }});
        put(Role.EMPLOYEE, new ArrayList<Permission>() {{
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

//    private static final Map<Permission, List<Action>> actionPermissions = new HashMap<Permission, List<Action>>() {{
//        put(Permission.THIS_USER, new ArrayList<Action>() {{
//            add(Action.MAKE_ORDER);
//            add(Action.READ_USER);
//            add(Action.WRITE_USER);
//        }}); // TODO
//    }};

    public static void check(Permission permission) {
        check(permission, null);
    }

    public static void check(Permission permission, String context) {
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
        if (!userPermissions.contains(permission)) throw new AccessDeniedException();

        switch (permission) {
            case THIS_USER:
                if (uid.equals(context)) {
                    return;
                }
                break;
            case OTHER_USERS:
                if (context != null) {
                    User contextUser = User.findByFirebaseUid(context);
                    if (contextUser != null && contextUser.getOrganization().equals(user.getOrganization())) {
                        return;
                    }
                }
                break;
            case THIS_ORGANIZATION:
                if (user.getOrganization().getId().toString().equals(context)) {
                    return;
                }
                break;
        }
        ThreadStorage.get().hasCheckedPermissions = true;

        throw new AccessDeniedException();
    }

    public static void ignore() {
        ThreadStorage.get().hasCheckedPermissions = true;
    }

    public static class AccessDeniedException extends RuntimeException {}

}
