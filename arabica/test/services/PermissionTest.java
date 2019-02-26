package services;

import models.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import org.powermock.core.classloader.annotations.PrepareForTest;

@RunWith(MockitoJUnitRunner.class)
@PrepareForTest(User.class)
public class PermissionTest {

    @Test
    public void testSysadmin() {
//        Organization mockOrganization = new Organization();
//        mockOrganization.setId(1L);
//
//        User expected = new User();
//        expected.setId(1L);
//        expected.setFirebaseUserId("sysadmin_id");
//        expected.setRole(Role.SYSADMIN.getValue());
//        expected.setOrganization(mockOrganization);
//
//        mockStatic(User.class);
//        expect(User.findByFirebaseUid("sysadmin_id")).andReturn(expected);
//
//        replay(User.class);
//
//        long actualId = tested.registerService(new Object());
//
//        // Note how we verify the class, not the instance!
//        verify(IdGenerator.class);
//
//        // Assert that the ID is correct
//        assertEquals(1L, actualId);

    }
}
