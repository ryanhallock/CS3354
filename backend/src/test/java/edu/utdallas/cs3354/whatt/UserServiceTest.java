package edu.utdallas.cs3354.whatt;

import edu.utdallas.cs3354.whatt.entity.User;
import edu.utdallas.cs3354.whatt.repository.UserRepository;
import edu.utdallas.cs3354.whatt.security.Role;
import edu.utdallas.cs3354.whatt.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for UserService.
 *
 *
 * createUser(username : String, rawPassword : String, role : Role)
 *
 *   username
 *     valid      : "alice", "bob123"
 *     duplicate  : username already in the repository  → IllegalArgumentException
 *
 *   rawPassword
 *     valid      : any non-null string; encoding is delegated to PasswordEncoder
 *
 *   role
 *     Role.USER   saved with {USER}
 *     Role.ADMIN  saved with {ADMIN, USER} (comment in source: admins need both)
 *
 * test cases
 *  #   input                         expected
 *  1   new username, "pass", USER    User saved; returned User has role USER only
 *  2   new username, "pass", ADMIN   User saved; returned User has roles ADMIN + USER
 *  3   duplicate username            IllegalArgumentException, save() never called
 *  4   password encoding             passwordEncoder.encode() called with raw password;
 *                                    returned User stores the encoded value
 *  5   repository interaction        userRepository.save() called exactly once on success
 */
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        // Default: username is NOT taken
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty());
        // Simulate encoding: prefix with "encoded:"
        when(passwordEncoder.encode(anyString()))
                .thenAnswer(inv -> "encoded:" + inv.getArgument(0));
        // Return the saved entity unchanged
        when(userRepository.save(any(User.class)))
                .thenAnswer(inv -> inv.getArgument(0));
    }

    //TC1: new USER

    @Test
    @DisplayName("TC-1: createUser with Role.USER saves user with only USER role")
    void createUser_roleUser_savedWithUserRoleOnly() {
        User result = userService.createUser("alice", "pass123", Role.USER);

        assertNotNull(result);
        assertEquals("alice", result.getUsername());
        assertEquals(Set.of(Role.USER), result.getRoles());
        assertFalse(result.isAdmin());
    }

    //TC2 new ADMIN

    @Test
    @DisplayName("TC-2: createUser with Role.ADMIN saves user with both ADMIN and USER roles")
    void createUser_roleAdmin_savedWithAdminAndUserRoles() {
        User result = userService.createUser("bob", "adminPass", Role.ADMIN);

        assertNotNull(result);
        assertEquals("bob", result.getUsername());
        assertEquals(Set.of(Role.ADMIN, Role.USER), result.getRoles());
        assertTrue(result.isAdmin());
    }

    // TC3 duplicate username

    @Test
    @DisplayName("TC-3: createUser with duplicate username throws IllegalArgumentException")
    void createUser_duplicateUsername_throwsIllegalArgumentException() {
        when(userRepository.findByUsername("alice"))
                .thenReturn(Optional.of(new User("alice", "hashed", Set.of(Role.USER))));

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> userService.createUser("alice", "anyPass", Role.USER)
        );

        assertEquals("Username already exists", ex.getMessage());
        verify(userRepository, never()).save(any());
    }

    // TC4 password encoding

    @Test
    @DisplayName("TC-4: createUser encodes the raw password before persisting")
    void createUser_passwordIsEncoded() {
        User result = userService.createUser("carol", "mySecret", Role.USER);

        // PasswordEncoder must be called with the raw password
        verify(passwordEncoder).encode("mySecret");
        // The stored password must be the encoded form, not the raw value
        assertEquals("encoded:mySecret", result.getPassword());
        assertNotEquals("mySecret", result.getPassword());
    }

    //TC5 save() called once

    @Test
    @DisplayName("TC-5: createUser calls userRepository.save() exactly once on success")
    void createUser_repositorySaveCalledOnce() {
        userService.createUser("dave", "pass", Role.USER);

        verify(userRepository, times(1)).save(any(User.class));
    }
}
