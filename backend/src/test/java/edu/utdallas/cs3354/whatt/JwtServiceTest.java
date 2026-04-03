package edu.utdallas.cs3354.whatt;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;
import edu.utdallas.cs3354.whatt.security.JwtService;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for JwtService.
 * test cases
 *  #   method            input                               expected
 *  1   generateToken     "alice"                             non-null, non-blank JWT string
 *  2   generateToken     "alice" x2                         two distinct tokens (iat differs)
 *  3   extractUsername   token from generateToken           alice
 *  4   extractUsername   null                                null (no exception)
 *  5   extractUsername   ""                                  null (no exception)
 *  6   extractUsername   "not.a.jwt"                         null (no exception)
 *  7   extractUsername   tampered token                      null (signature invalid)
 *  8   extractUsername   expired token                       null
 *  9   isTokenValid      fresh token                         true
 * 10   isTokenValid      null                                false (no exception)
 * 11   isTokenValid      garbage string                      false
 * 12   isTokenValid      tampered token                      false
 * 13   isTokenValid      expired token                       false
 */
class JwtServiceTest {

    // 32-byte secret
    private static final String SECRET =
            "test-secret-key-that-is-32-bytes!!";
    private static final long VALID_EXPIRATION    = 3_600_000L; // 1 hour
    private static final long EXPIRED_EXPIRATION  = -1000L;     // already expired

    private JwtService jwtService;


    private JwtService buildService(long expiration) {
        JwtService svc = new JwtService();
        ReflectionTestUtils.setField(svc, "secret",     SECRET);
        ReflectionTestUtils.setField(svc, "expiration", expiration);
        // @PostConstruct init() called manually in unit tests
        ReflectionTestUtils.invokeMethod(svc, "init");
        return svc;
    }

    @BeforeEach
    void setUp() {
        jwtService = buildService(VALID_EXPIRATION);
    }

    // token generation

    @Test
    @DisplayName("TC-1: generateToken returns a non-null, non-blank JWT string")
    void generateToken_validUsername_returnsToken() {
        String token = jwtService.generateToken("alice");

        assertNotNull(token);
        assertFalse(token.isBlank());
        // JWT format: three Base64-url segments separated by dots
        assertEquals(3, token.split("\\.").length,
                "Token should have 3 dot-separated segments");
    }

    @Test
    @DisplayName("TC-2: generateToken called twice produces distinct tokens")
    void generateToken_calledTwice_producesDistinctTokens() throws InterruptedException {
        String t1 = jwtService.generateToken("alice");
        Thread.sleep(10); // ensure iat differs
        String t2 = jwtService.generateToken("alice");

        assertNotEquals(t1, t2, "Tokens issued at different times must differ");
    }

    //extractUsername

    @Test
    @DisplayName("TC-3: extractUsername returns correct subject from valid token")
    void extractUsername_validToken_returnsUsername() {
        String token = jwtService.generateToken("alice");

        assertEquals("alice", jwtService.extractUsername(token));
    }

    @Test
    @DisplayName("TC-4: extractUsername with null returns null, no exception")
    void extractUsername_null_returnsNull() {
        assertNull(jwtService.extractUsername(null));
    }

    @Test
    @DisplayName("TC-5: extractUsername with blank string returns null, no exception")
    void extractUsername_blank_returnsNull() {
        assertNull(jwtService.extractUsername(""));
    }

    @Test
    @DisplayName("TC-6: extractUsername with random garbage returns null")
    void extractUsername_garbage_returnsNull() {
        assertNull(jwtService.extractUsername("not.a.jwt.token"));
    }

    @Test
    @DisplayName("TC-7: extractUsername with tampered signature returns null")
    void extractUsername_tamperedSignature_returnsNull() {
        String token  = jwtService.generateToken("alice");
        String tampered = token.substring(0, token.lastIndexOf('.') + 1) + "INVALIDSIG";

        assertNull(jwtService.extractUsername(tampered));
    }

    @Test
    @DisplayName("TC-8: extractUsername with expired token returns null")
    void extractUsername_expiredToken_returnsNull() {
        JwtService expiredService = buildService(EXPIRED_EXPIRATION);
        String expiredToken = expiredService.generateToken("alice");

        assertNull(jwtService.extractUsername(expiredToken));
    }

    // isTokenValid

    @Test
    @DisplayName("TC-9: isTokenValid returns true for a fresh, valid token")
    void isTokenValid_freshToken_returnsTrue() {
        String token = jwtService.generateToken("alice");

        assertTrue(jwtService.isTokenValid(token));
    }

    @Test
    @DisplayName("TC-10: isTokenValid returns false for null, no exception")
    void isTokenValid_null_returnsFalse() {
        assertFalse(jwtService.isTokenValid(null));
    }

    @Test
    @DisplayName("TC-11: isTokenValid returns false for garbage string")
    void isTokenValid_garbage_returnsFalse() {
        assertFalse(jwtService.isTokenValid("garbage.token.value"));
    }

    @Test
    @DisplayName("TC-12: isTokenValid returns false for tampered token")
    void isTokenValid_tampered_returnsFalse() {
        String token    = jwtService.generateToken("alice");
        String tampered = token.substring(0, token.lastIndexOf('.') + 1) + "BADSIG";

        assertFalse(jwtService.isTokenValid(tampered));
    }

    @Test
    @DisplayName("TC-13: isTokenValid returns false for expired token")
    void isTokenValid_expired_returnsFalse() {
        JwtService expiredService = buildService(EXPIRED_EXPIRATION);
        String expiredToken = expiredService.generateToken("alice");

        assertFalse(jwtService.isTokenValid(expiredToken));
    }
}
