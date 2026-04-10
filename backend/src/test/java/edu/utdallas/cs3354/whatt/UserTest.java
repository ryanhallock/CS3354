package edu.utdallas.cs3354.whatt;

import static org.junit.jupiter.api.Assertions.*;

import edu.utdallas.cs3354.whatt.entity.User;
import edu.utdallas.cs3354.whatt.security.Role;
import java.util.Set;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * Unit tests for User.
 * input values and specification
 *   constructor(username : String, password : String, roles : Set<Role>)
 *     valid        : non-null username/password with at least USER or ADMIN role
 *   isAdmin()
 *     valid        : roles contains ADMIN returns true
 *     invalid      : roles without ADMIN returns false
 *   roles set immutability
 *     getRoles() returns an unmodifiable set view
 * scenario candidates and expected output
 *  #   scenario                                   expected
 *  1   USER only                                  isAdmin() == false
 *  2   ADMIN + USER                               isAdmin() == true
 *  3   ADMIN only                                 isAdmin() == true
 *  4   mutate getRoles() result                   UnsupportedOperationException
 *  5   constructor values                         getters return same username/password
 * narrowed concrete values used in tests
 *  - usernames: "alice", "bob", "root", "carol", "dave"
 *  - passwords: "hashed", "s3cr3t"
 *  - role sets: {USER}, {ADMIN}, {ADMIN, USER}
 */
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
        assertThrows(UnsupportedOperationException.class, () -> user.getRoles().add(Role.ADMIN));
    }

    @Test
    @DisplayName("TC-5: getUsername and getPassword return constructor values")
    void constructor_setsUsernameAndPassword() {
        User user = new User("dave", "s3cr3t", Set.of(Role.USER));
        assertEquals("dave", user.getUsername());
        assertEquals("s3cr3t", user.getPassword());
    }
}
