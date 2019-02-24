package services.authorization;

import java.util.HashMap;
import java.util.Map;

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
