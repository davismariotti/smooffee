package helpers;

import graphql.QLUser;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class QLTest {

    @Test
    public void testPrepareString() {
        assertEquals("\\\"test\\\"", QL.prepare("test"));
    }

    @Test
    public void testPrepareArrayOfStrings() {
        String[] strings = new String[]{"test", "test 2", "test 3"};

        assertEquals("[\\\"test\\\", \\\"test 2\\\", \\\"test 3\\\"]", QL.prepare(strings));
    }

    @Test
    public void testPrepareCollectionOfStrings() {
        List<String> strings = new ArrayList<>();
        strings.add("test");
        strings.add("test 2");
        strings.add("test 3");

        assertEquals("[\\\"test\\\", \\\"test 2\\\", \\\"test 3\\\"]", QL.prepare(strings));
    }

    @Test
    public void testPrepareObject() {
        QLUser.UserInput input = new QLUser.UserInput();
        input.setEmail("test@test.com");
        input.setFirstName("Test");
        input.setLastName("User");

        assertEquals("{email: \\\"test@test.com\\\", firstname: \\\"Test\\\", lastname: \\\"User\\\"}", QL.prepare(input));
    }

    @Test
    public void testPrepareObjectWithCollection() {
        List<String> testList = new ArrayList<>();
        testList.add("Test 1");
        testList.add("Test 2");
        TestClass testClass = new TestClass(testList, new TestClass(new ArrayList<>(), null, "other val 1", 5), "other val 2", 2);

        assertEquals("{otherTestClass: {otherVal: \\\"other val 1\\\", primitiveTest: 5, testList: []}, otherVal: \\\"other val 2\\\", primitiveTest: 2, testList: [\\\"Test 1\\\", \\\"Test 2\\\"]}", QL.prepare(testClass));
    }

    private class TestClass {
        List<String> testList;
        TestClass otherTestClass;
        String otherVal;

        int primitiveTest;

        public TestClass(List<String> testList, TestClass otherTestClass, String otherVal, int primitiveTest) {
            this.testList = testList;
            this.otherTestClass = otherTestClass;
            this.otherVal = otherVal;
            this.primitiveTest = primitiveTest;
        }

        public List<String> getTestList() {
            return testList;
        }

        public TestClass getOtherTestClass() {
            return otherTestClass;
        }

        public String getOtherVal() {
            return otherVal;
        }

        public int getPrimitiveTest() {
            return primitiveTest;
        }
    }
}
