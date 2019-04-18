package graphql;

import com.google.common.collect.Ordering;
import environment.FakeApplication;
import environment.Setup;
import models.User;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import services.authorization.Role;
import utilities.QLFinder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;

public class QLFinderTest {

    @BeforeClass
    public static void setup() {
        FakeApplication.start(true);
        Setup.createDefaultOrganization();
        Setup.createDefaultSysadmin();

        for (int i = 0; i < 10; i++) {
            new User()
                    .setFirebaseUserId(RandomStringUtils.randomAlphabetic(10))
                    .setOrganization(Setup.defaultOrganization)
                    .setRole(Role.CUSTOMER.getValue())
                    .setBalance(i * 1000)
                    .setEmail(RandomStringUtils.randomAlphabetic(6) + "@" + RandomStringUtils.randomAlphabetic(4) + ".com")
                    .setFirstName(RandomStringUtils.randomAlphabetic(7))
                    .setLastName(RandomStringUtils.randomAlphabetic(10))
                    .setStatus(i % 4)
                    .store();
        }
        new User()
                .setFirebaseUserId("samplefirebase")
                .setOrganization(Setup.defaultOrganization)
                .setRole(Role.CUSTOMER.getValue())
                .setBalance(100000)
                .setEmail("sample@sample.com")
                .setFirstName("sample")
                .setLastName("sample")
                .store();
    }

    @AfterClass
    public static void teardown() {
        FakeApplication.stop();
    }

    @Test
    public void testOrdering() {
        QLFinder parameters = new QLFinder();
        parameters.order = new ArrayList<>();
        parameters.order.add("firstName");
        parameters.order.add("asc");

        QLUser.UserEntry[] entries = QLUserTest.listUsers(Setup.defaultOrganization.getId(), parameters);
        assertTrue(Ordering.natural().isOrdered(Arrays.stream(entries).map(QLUser.UserEntry::getFirstname).collect(Collectors.toList())));

        parameters.order.remove("asc");
        parameters.order.add("desc");
        entries = QLUserTest.listUsers(Setup.defaultOrganization.getId(), parameters);
        assertTrue(Ordering.natural().reverse().isOrdered(Arrays.stream(entries).map(QLUser.UserEntry::getFirstname).collect(Collectors.toList())));
    }

    @Test
    public void testEq() {
        QLFinder parameters = new QLFinder();
        parameters.filter = new QLFinder.QLFinderTerm();
        parameters.filter.eq = new QLFinder.QLFinderValue();
        parameters.filter.eq.field = "firstName";
        parameters.filter.eq.value = "sample";

        QLUser.UserEntry[] entries = QLUserTest.listUsers(Setup.defaultOrganization.getId(), parameters);
        assertEquals(1, entries.length);
        assertEquals("samplefirebase", entries[0].getId());
    }

    @Test
    public void testGt() {
        QLFinder parameters = new QLFinder();
        parameters.filter = new QLFinder.QLFinderTerm();
        parameters.filter.gt = new QLFinder.QLFinderValue();
        parameters.filter.gt.field = "balance";
        parameters.filter.gt.value = "6000";

        QLUser.UserEntry[] entries = QLUserTest.listUsers(Setup.defaultOrganization.getId(), parameters);
        for (QLUser.UserEntry entry : entries) {
            assertTrue(entry.getBalance() > 6000);
        }
    }

    @Test
    public void testLte() {
        QLFinder parameters = new QLFinder();
        parameters.filter = new QLFinder.QLFinderTerm();
        parameters.filter.lte = new QLFinder.QLFinderValue();
        parameters.filter.lte.field = "balance";
        parameters.filter.lte.value = "6000";

        QLUser.UserEntry[] entries = QLUserTest.listUsers(Setup.defaultOrganization.getId(), parameters);
        for (QLUser.UserEntry entry : entries) {
            assertTrue(entry.getBalance() <= 6000);
        }
    }

    @Test
    public void testCountOffset() {
        QLFinder parameters = new QLFinder();
        parameters.count = 2;
        parameters.offset = 0;
        parameters.order = new ArrayList<>();
        parameters.order.add("balance");
        parameters.order.add("asc");

        QLUser.UserEntry[] entries = QLUserTest.listUsers(Setup.defaultOrganization.getId(), parameters);
        assertEquals(2, entries.length);
        assertEquals(0, entries[0].getBalance().intValue());
        assertEquals(0, entries[1].getBalance().intValue());

        parameters.offset = 2;
        entries = QLUserTest.listUsers(Setup.defaultOrganization.getId(), parameters);
        assertEquals(2, entries.length);
        assertEquals(1000, entries[0].getBalance().intValue());
        assertEquals(2000, entries[1].getBalance().intValue());
    }

    @Test
    public void testOr() {
        QLFinder parameters = new QLFinder();
        parameters.filter = new QLFinder.QLFinderTerm();
        parameters.filter.or = new ArrayList<>();

        QLFinder.QLFinderTerm lt = new QLFinder.QLFinderTerm();
        lt.lt = new QLFinder.QLFinderValue();
        lt.lt.field = "balance";
        lt.lt.value = "3000";
        parameters.filter.or.add(lt);

        QLFinder.QLFinderTerm gte = new QLFinder.QLFinderTerm();
        gte.gte = new QLFinder.QLFinderValue();
        gte.gte.field = "balance";
        gte.gte.value = "6000";
        parameters.filter.or.add(gte);

        QLUser.UserEntry[] entries = QLUserTest.listUsers(Setup.defaultOrganization.getId(), parameters);
        for (QLUser.UserEntry entry : entries) {
            assertTrue(entry.getBalance() >= 6000 || entry.getBalance() < 3000);
        }
    }

    @Test
    public void testAnd() {
        QLFinder parameters = new QLFinder();
        parameters.filter = new QLFinder.QLFinderTerm();
        parameters.filter.and = new ArrayList<>();

        QLFinder.QLFinderTerm gte = new QLFinder.QLFinderTerm();
        gte.gte = new QLFinder.QLFinderValue();
        gte.gte.field = "balance";
        gte.gte.value = "3000";
        parameters.filter.and.add(gte);

        QLFinder.QLFinderTerm lt = new QLFinder.QLFinderTerm();
        lt.lt = new QLFinder.QLFinderValue();
        lt.lt.field = "balance";
        lt.lt.value = "6000";
        parameters.filter.and.add(lt);

        QLUser.UserEntry[] entries = QLUserTest.listUsers(Setup.defaultOrganization.getId(), parameters);
        for (QLUser.UserEntry entry : entries) {
            assertTrue(entry.getBalance() >= 3000 && entry.getBalance() < 6000);
        }
    }

    @Test
    public void testNotAndNesting() {
        QLFinder parameters = new QLFinder();
        parameters.filter = new QLFinder.QLFinderTerm();
        parameters.filter.not = new QLFinder.QLFinderTerm();
        parameters.filter.not.not = new QLFinder.QLFinderTerm();
        parameters.filter.not.not.not = new QLFinder.QLFinderTerm();

        List<QLFinder.QLFinderTerm> or = new ArrayList<>();

        QLFinder.QLFinderTerm lt = new QLFinder.QLFinderTerm();
        lt.lt = new QLFinder.QLFinderValue();
        lt.lt.field = "balance";
        lt.lt.value = "3000";
        or.add(lt);

        QLFinder.QLFinderTerm gte = new QLFinder.QLFinderTerm();
        gte.gte = new QLFinder.QLFinderValue();
        gte.gte.field = "balance";
        gte.gte.value = "6000";
        or.add(gte);

        parameters.filter.not.not.not.or = or;

        QLUser.UserEntry[] entries = QLUserTest.listUsers(Setup.defaultOrganization.getId(), parameters);
        for (QLUser.UserEntry entry : entries) {
            assertTrue(entry.getBalance() < 6000 && entry.getBalance() >= 3000);
        }
    }

    @Test
    public void testInclude() {
        QLFinder parameters = new QLFinder();
        parameters.filter = new QLFinder.QLFinderTerm();
        parameters.filter.include = new QLFinder.QLFinderValueList();
        parameters.filter.include.field = "status";
        parameters.filter.include.values = new ArrayList<>();
        parameters.filter.include.values.add("1");
        parameters.filter.include.values.add("3");

        QLUser.UserEntry[] entries = QLUserTest.listUsers(Setup.defaultOrganization.getId(), parameters);
        for (QLUser.UserEntry entry : entries) {
            assertTrue(entry.getStatus() == 1 || entry.getStatus() == 3);
        }
    }
}
