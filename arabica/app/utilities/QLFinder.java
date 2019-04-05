package utilities;

import io.ebean.Expression;
import io.ebean.Finder;
import io.ebean.OrderBy;
import io.ebean.Query;
import org.apache.commons.lang3.StringUtils;

import java.lang.reflect.Method;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import static io.ebean.Expr.*;

public class QLFinder {

    public Integer offset;
    public Integer count;

    public QLFinderTerm filter;

    public List<String> order;

    public static class QLFinderTerm {
        public List<QLFinderTerm> and;
        public List<QLFinderTerm> or;
        public QLFinderTerm not;

        public QLFinderValue eq;
        public QLFinderValue gt;
        public QLFinderValue gte;
        public QLFinderValue lt;
        public QLFinderValue lte;
        public QLFinderValue like;
        public QLFinderValue ilike;

        public QLFinderValueList include;
    }

    public static class QLFinderValue {
        public String field;

        public String value;
    }

    public static class QLFinderValueList {
        public String field;

        public List<String> values;
    }

    public <T> Query<T> build(Class<T> modelClazz) {
        Query<T> query = new Finder<Long, T>(modelClazz).query();


        // Apply count/offset
        if (offset != null && count != null) {
            query = query.setFirstRow(offset).setMaxRows(count);
        }

        if (order != null && order.size() % 2 == 0) {
            OrderBy<T> orderBy = new OrderBy<>();
            for (int i = 0; i < order.size(); i += 2) {
                String field = order.get(i);
                String ascdesc = order.get(i + 1).toLowerCase();
                if (ascdesc.equalsIgnoreCase("asc")) {
                    orderBy.asc(field);
                } else {
                    orderBy.desc(field);
                }
            }
            query = query.setOrder(orderBy);
        }

        if (filter != null) {
            query = query.where(getExpression(filter, modelClazz));
        }

        return query;
    }

    public Expression getExpression(QLFinderTerm term, Class modelClazz) {
        if (term.eq != null) {
            return eq(term.eq.field, convertFieldValue(modelClazz, term.eq.field, term.eq.value));
        } else if (term.gt != null) {
            return gt(term.gt.field, convertFieldValue(modelClazz, term.gt.field, term.gt.value));
        } else if (term.gte != null) {
            return ge(term.gte.field, convertFieldValue(modelClazz, term.gte.field, term.gte.value));
        } else if (term.lt != null) {
            return lt(term.lt.field, convertFieldValue(modelClazz, term.lt.field, term.lt.value));
        } else if (term.lte != null) {
            return le(term.lte.field, convertFieldValue(modelClazz, term.lte.field, term.lte.value));
        } else if (term.like != null) {
            return like(term.like.field, term.like.value);
        } else if (term.ilike != null) {
            return like(term.ilike.field, term.ilike.value);
        } else if (term.include != null) {
            return in(term.include.field, term.include.values.stream().map(value -> convertFieldValue(modelClazz, term.include.field, value)).collect(Collectors.toList()));
        } else if (term.not != null) {
            return not(getExpression(term.not, modelClazz));
        } else if (term.or != null) {
            return or(getExpression(term.or.get(0), modelClazz), getExpression(term.or.get(1), modelClazz));
        } else if (term.and != null) {
            return and(getExpression(term.and.get(0), modelClazz), getExpression(term.and.get(1), modelClazz));
        }
        return null;
    }

    public static Object convertFieldValue(Class modelClazz, String field, String value) {
        Class clazz = getFieldType(modelClazz, field);
        Function<String, Object> func = convertMap.get(clazz);
        if (func == null) {
            throw new QLException(String.format("Object type %s not supported.", clazz.getTypeName()));
        }
        return func.apply(value);
    }

    public static Class getFieldType(Class startingClass, String field) {
        String[] split = field.split("\\.", 2);
        String getter = String.format("get%s", StringUtils.capitalize(split[0]));
        Method methodGetter = Arrays.stream(startingClass.getMethods()).filter(method -> method.getName().equals(getter)).findFirst().orElse(null);
        if (methodGetter == null) {
            throw new QLException(String.format("Field %s does not exist", field));
        }
        if (split.length > 1) {
            return getFieldType(methodGetter.getReturnType(), split[1]);
        }
        return methodGetter.getReturnType();
    }

    public static final Map<Class, Function<String, Object>> convertMap = new HashMap<Class, Function<String, Object>>() {{
        put(String.class, (x) -> x);
        put(Integer.class, Integer::parseInt);
        put(Long.class, Long::parseLong);
        put(Date.class, QLFinder::parseDate);
        put(Boolean.class, Boolean::parseBoolean);
    }};

    private static Date parseDate(String d) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        format.setTimeZone(TimeZone.getTimeZone("UTC"));
        try {
            return format.parse(d);
        } catch (java.text.ParseException e) {
            return null;
        }
    }

}
