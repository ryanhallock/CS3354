package edu.utdallas.cs3354.whatt;

import edu.utdallas.cs3354.whatt.security.JwtAuthFilter;
import edu.utdallas.cs3354.whatt.security.JwtService;
import edu.utdallas.cs3354.whatt.service.DatabaseUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


/**
 * Unit tests for JwtAuthFilter.
 * input values and specification
 *   HTTP cookies (Cookie[])
 *     valid        : contains cookie named "jwt" whose token maps to a username
 *     invalid      : no cookies, or cookies without "jwt", or token maps to null username
 *     exceptional  : JwtService throws while parsing token
 *   SecurityContext state
 *     empty        : filter may authenticate user from JWT
 *     pre-populated: filter must not override existing authentication
 * scenario candidates and expected output
 *  #   scenario                                   SecurityContext set?  chain.doFilter called?
 *  1   no cookies                                 no                    yes
 *  2   cookie present but not "jwt"               no                    yes
 *  3   valid jwt cookie                           yes                   yes
 *  4   jwt cookie with null-username token        no                    yes
 *  5   SecurityContext already populated          no new auth           yes
 *  6   JwtService throws RuntimeException         no                    yes
 * narrowed concrete values used in tests
 *  - cookie names: "jwt", "session"
 *  - token strings: "valid.token.here", "bad.token", "some.token", "boom.token"
 *  - extracted username: "alice"
 */
@ExtendWith(MockitoExtension.class)
class JwtAuthFilterTest {

    @Mock
    private JwtService jwtService;

    @Mock
    private DatabaseUserDetailsService userDetailsService;

    @Mock
    private FilterChain filterChain;

    @InjectMocks
    private JwtAuthFilter filter;

    private MockHttpServletRequest  request;
    private MockHttpServletResponse response;

    private static final UserDetails ALICE = new User(
            "alice", "hashed",
            List.of(new SimpleGrantedAuthority("ROLE_USER")));

    @BeforeEach
    void setUp() {
        request  = new MockHttpServletRequest();
        response = new MockHttpServletResponse();
        SecurityContextHolder.clearContext();          // clean slate each test
    }

    //TC1 no cookies

    @Test
    @DisplayName("TC-1: no cookies → SecurityContext empty, filter chain continues")
    void noCookies_securityContextEmpty_chainContinues() throws Exception {
        // request has no cookies by default

        filter.doFilterInternal(request, response, filterChain);

        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(filterChain).doFilter(request, response);
        verifyNoInteractions(jwtService, userDetailsService);
    }

    //  TC2 unrelated cookie

    @Test
    @DisplayName("TC-2: cookie exists but not 'jwt'  SecurityContext empty, chain continues")
    void unrelatedCookie_securityContextEmpty() throws Exception {
        request.setCookies(new Cookie("session", "abc123"));

        filter.doFilterInternal(request, response, filterChain);

        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(filterChain).doFilter(request, response);
        verifyNoInteractions(jwtService, userDetailsService);
    }

    // TC3 valid jwt cookie

    @Test
    @DisplayName("TC-3: valid jwt cookie  authentication set in SecurityContext")
    void validJwtCookie_authenticatesUser() throws Exception {
        request.setCookies(new Cookie("jwt", "valid.token.here"));
        when(jwtService.extractUsername("valid.token.here")).thenReturn("alice");
        when(userDetailsService.loadUserByUsername("alice")).thenReturn(ALICE);

        filter.doFilterInternal(request, response, filterChain);

        assertNotNull(SecurityContextHolder.getContext().getAuthentication());
        assertEquals("alice",
                SecurityContextHolder.getContext().getAuthentication().getName());
        verify(filterChain).doFilter(request, response);
    }

    // TC4 jwt cookie but token yields null username

    @Test
    @DisplayName("TC-4: jwt cookie with invalid token (extractUsername=null)  no auth set")
    void invalidToken_noAuthenticationSet() throws Exception {
        request.setCookies(new Cookie("jwt", "bad.token"));
        when(jwtService.extractUsername("bad.token")).thenReturn(null);

        filter.doFilterInternal(request, response, filterChain);

        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verifyNoInteractions(userDetailsService);
        verify(filterChain).doFilter(request, response);
    }

    // TC5 SecurityContext already populated

    @Test
    @DisplayName("TC-5: SecurityContext already authenticated → filter logic skipped")
    void securityContextAlreadySet_filterSkipped() throws Exception {
        // Pre-populate the context (simulates a previous filter having authenticated)
        var existingAuth = new org.springframework.security.authentication
                .UsernamePasswordAuthenticationToken(ALICE, null, ALICE.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(existingAuth);

        request.setCookies(new Cookie("jwt", "some.token"));

        filter.doFilterInternal(request, response, filterChain);

        // Neither JwtService nor UserDetailsService should be touched
        verifyNoInteractions(jwtService, userDetailsService);
        verify(filterChain).doFilter(request, response);
    }

    // TC6 JwtService throws unexpectedly

    @Test
    @DisplayName("TC-6: JwtService throws RuntimeException  exception swallowed, chain continues")
    void jwtServiceThrows_exceptionSwallowed_chainContinues() throws Exception {
        request.setCookies(new Cookie("jwt", "boom.token"));
        when(jwtService.extractUsername("boom.token"))
                .thenThrow(new RuntimeException("unexpected"));

        // Must not throw
        assertDoesNotThrow(() ->
                filter.doFilterInternal(request, response, filterChain));

        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(filterChain).doFilter(request, response);
    }
}
