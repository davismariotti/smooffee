package services.authorization;

import java.util.HashMap;
import java.util.Map;

public enum Role {
    ANONYMOUS("anonymous", -1),
    SYSADMIN("sysadmin", 0),
    ADMIN("admin", 1),
    EMPLOYEE("employee", 2),
    CUSTOMER("customer", 3);

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

    public int getValue() {
        return this.value;
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
