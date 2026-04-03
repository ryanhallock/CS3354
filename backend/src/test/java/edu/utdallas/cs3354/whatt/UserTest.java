package edu.utdallas.cs3354.whatt;

import edu.utdallas.cs3354.whatt.entity.User;
import edu.utdallas.cs3354.whatt.security.Role;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    @DisplayName("TC-1: User with only USER role isAdmin() is false")
    void isAdmin_roleUserOnly_returnsFalse() {
        User user = new User("alice", "hashed", Set.of(Role.USER));
        assertFalse(user.isAdmin());
    }

    @Test
    @DisplayName("TC-2: User with ADMIN + USER roles isAdmin() is true")
    void isAdmin_roleAdminAndUser_returnsTrue() {
        User user = new User("bob", "hashed", Set.of(Role.ADMIN, Role.USER));
        assertTrue(user.isAdmin());
    }

    @Test
    @DisplayName("TC-3: User with only ADMIN role isAdmin() is true")
    void isAdmin_roleAdminOnly_returnsTrue() {
        User user = new User("root", "hashed", Set.of(Role.ADMIN));
        assertTrue(user.isAdmin());
    }

    @Test
    @DisplayName("TC-4: roles set is immutable after construction")
    void roles_areImmutableAfterConstruction() {
        User user = new User("carol", "hashed", Set.of(Role.USER));
        assertThrows(UnsupportedOperationException.class,
                () -> user.getRoles().add(Role.ADMIN));
    }

    @Test
    @DisplayName("TC-5: getUsername and getPassword return constructor values")
    void constructor_setsUsernameAndPassword() {
        User user = new User("dave", "s3cr3t", Set.of(Role.USER));
        assertEquals("dave",   user.getUsername());
        assertEquals("s3cr3t", user.getPassword());
    }
}