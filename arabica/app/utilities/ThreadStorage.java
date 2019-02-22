package utilities;

import java.util.HashMap;
import java.util.Map;

public class ThreadStorage {
    private static Map<Thread, Storage> threadStorageMap = new HashMap<>();

    public static Storage get() {
        return threadStorageMap.get(Thread.currentThread());
    }

    public static Storage put(Storage storage) {
        return threadStorageMap.put(Thread.currentThread(), storage);
    }

    public static void remove() {
        threadStorageMap.remove(Thread.currentThread());
    }

    public static class Storage {
        public String uid;
        public boolean hasCheckedPermissions = false;
    }

}
