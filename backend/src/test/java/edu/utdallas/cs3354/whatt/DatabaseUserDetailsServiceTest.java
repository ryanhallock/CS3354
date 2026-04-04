package edu.utdallas.cs3354.whatt;

import edu.utdallas.cs3354.whatt.entity.User;
import edu.utdallas.cs3354.whatt.repository.UserRepository;
import edu.utdallas.cs3354.whatt.security.Role;
import edu.utdallas.cs3354.whatt.service.DatabaseUserDetailsService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class DatabaseUserDetailsServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private DatabaseUserDetailsService service;

    // TC1 regular USER

    @Test
    @DisplayName("TC-1: loadUserByUsername maps USER role to ROLE_USER authority")
    void loadUserByUsername_regularUser_hasUserAuthority() {
        User user = new User("alice", "hashed", Set.of(Role.USER));
        when(userRepository.findByUsername("alice")).thenReturn(Optional.of(user));

        UserDetails details = service.loadUserByUsername("alice");

        assertEquals("alice", details.getUsername());
        Set<String> authorities = details.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());
        assertEquals(Set.of("ROLE_USER"), authorities);
    }

    // TC2 ADMIN user gets both authorities

    @Test
    @DisplayName("TC-2: loadUserByUsername maps ADMIN+USER roles to both authorities")
    void loadUserByUsername_adminUser_hasBothAuthorities() {
        User user = new User("bob", "hashed", Set.of(Role.ADMIN, Role.USER));
        when(userRepository.findByUsername("bob")).thenReturn(Optional.of(user));

        UserDetails details = service.loadUserByUsername("bob");

        Set<String> authorities = details.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());
        assertTrue(authorities.contains("ROLE_ADMIN"));
        assertTrue(authorities.contains("ROLE_USER"));
        assertEquals(2, authorities.size());
    }

    // TC3 unknown username

    @Test
    @DisplayName("TC-3: loadUserByUsername throws UsernameNotFoundException for unknown user")
    void loadUserByUsername_unknownUser_throwsUsernameNotFoundException() {
        when(userRepository.findByUsername("ghost")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class,
                () -> service.loadUserByUsername("ghost"));
    }

    //TC4 password forwarded from DB

    @Test
    @DisplayName("TC-4: loadUserByUsername forwards the stored (encoded) password")
    void loadUserByUsername_returnsStoredEncodedPassword() {
        User user = new User("carol", "$2a$10$encodedHash", Set.of(Role.USER));
        when(userRepository.findByUsername("carol")).thenReturn(Optional.of(user));

        UserDetails details = service.loadUserByUsername("carol");

        assertEquals("$2a$10$encodedHash", details.getPassword());
    }
}
