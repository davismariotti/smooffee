package helpers;

import jdk.nashorn.internal.ir.ObjectNode;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class QL {
    public static String prepare(Object obj) {
        if (obj instanceof String) {
            return String.format("\\\"%s\\\"", (String) obj);
        } else if (obj instanceof Number) {
            return obj.toString();
        }else if (obj instanceof Collection) {
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (Object item : (Collection) obj) {
                sb.append(prepare(item));
                sb.append(", ");
            }
            if (sb.length() > 1) {
                sb.delete(sb.length() - 2, sb.length());
            }
            sb.append("]");
            return sb.toString();
        } else if (obj.getClass().isArray()) {
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (Object item : (Object[]) obj) {
                sb.append(prepare(item));
                sb.append(", ");
            }
            if (sb.length() > 1) {
                sb.delete(sb.length() - 2, sb.length());
            }
            sb.append("]");
            return sb.toString();
        } else {
            try {
                // Find get methods of obj
                Class clazz = obj.getClass();
                Method[] methodsArray = clazz.getDeclaredMethods();
                List<Method> methods = Arrays.stream(methodsArray).sorted(Comparator.comparing(Method::getName)).collect(Collectors.toList());

                StringBuilder sb = new StringBuilder();
                sb.append("{");
                for (Method method : methods) {
                    if (method.getName().startsWith("get")) {
                        Object invokationResult = method.invoke(obj);
                        if (invokationResult != null) {
                            sb.append(method.getName().substring(3, 4).toLowerCase().concat(method.getName().substring(4)));
                            sb.append(": ");
                            sb.append(prepare(invokationResult));
                            sb.append(", ");
                        }
                    }
                }
                if (sb.length() > 1) {
                    sb.delete(sb.length() - 2, sb.length());
                }
                sb.append("}");
                return sb.toString();
            } catch (IllegalAccessException | InvocationTargetException e) {
                return null;
            }
        }
    }
}
