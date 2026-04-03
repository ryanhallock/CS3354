package edu.utdallas.cs3354.whatt;

import edu.utdallas.cs3354.whatt.entity.User;
import edu.utdallas.cs3354.whatt.security.JwtService;
import edu.utdallas.cs3354.whatt.security.Role;
import edu.utdallas.cs3354.whatt.service.AuthService;
import edu.utdallas.cs3354.whatt.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for AuthService.
 * register(username, password)
 *
 * login(username, password)
 * valid   : AuthenticationManager accepts credentials returns JWT string
 * invalid : AuthenticationManager throws BadCredentialsException propagates
 * test cases
 *  #   method     input                 expected
 *  1   register   "alice", "pass"       userService.createUser("alice","pass", Role.USER) called
 *  2   login      "alice", "correct"    returns non-null token from JwtService
 *  3   login      AuthManager throws    BadCredentialsException propagates; generateToken is never called
 *  4   login      "alice", "correct"    AuthManager called with correct UsernamePasswordAuthenticationToken
 */
@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserService userService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    //TC1 register delegates to UserService with Role.USER

    @Test
    @DisplayName("TC-1: register calls userService.createUser with Role.USER")
    void register_delegatesToUserServiceWithRoleUser() {
        authService.register("alice", "pass123");

        verify(userService, times(1))
                .createUser("alice", "pass123", Role.USER);
    }

    //TC2 login returns token from JwtService on valid credentials

    @Test
    @DisplayName("TC-2: login returns JWT token when credentials are valid")
    void login_validCredentials_returnsToken() {
        when(jwtService.generateToken("alice")).thenReturn("mocked.jwt.token");

        String token = authService.login("alice", "correct");

        assertNotNull(token);
        assertEquals("mocked.jwt.token", token);
    }

    // TC3 login propagates exception on bad credentials

    @Test
    @DisplayName("TC-3: login propagates BadCredentialsException from AuthenticationManager")
    void login_badCredentials_throwsBadCredentialsException() {
        doThrow(new BadCredentialsException("Bad credentials"))
                .when(authenticationManager).authenticate(any());

        assertThrows(BadCredentialsException.class,
                () -> authService.login("alice", "wrongPass"));

        // Token must never be generated if authentication failed
        verify(jwtService, never()).generateToken(anyString());
    }

    // TC4 login calls AuthManager with correct token

    @Test
    @DisplayName("TC-4: login passes correct UsernamePasswordAuthenticationToken to AuthManager")
    void login_passesCorrectTokenToAuthManager() {
        when(jwtService.generateToken(anyString())).thenReturn("token");

        authService.login("alice", "secret");

        ArgumentCaptor<UsernamePasswordAuthenticationToken> captor =
                ArgumentCaptor.forClass(UsernamePasswordAuthenticationToken.class);
        verify(authenticationManager).authenticate(captor.capture());

        UsernamePasswordAuthenticationToken captured = captor.getValue();
        assertEquals("alice",  captured.getPrincipal());
        assertEquals("secret", captured.getCredentials());
    }
}
