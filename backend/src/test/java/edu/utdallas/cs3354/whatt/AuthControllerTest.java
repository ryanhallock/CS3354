package edu.utdallas.cs3354.whatt;

import edu.utdallas.cs3354.whatt.controller.AuthController;
import edu.utdallas.cs3354.whatt.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Web-layer tests for AuthController using MockMvc.
 * POST /api/auth/register   body: { username, password }
 *   valid     : both fields present, username not taken  → 201 + message
 *   duplicate : username already taken                   → 400 + error
 *   invalid   : blank/missing field (@NotBlank)          → 400
 *
 * POST /api/auth/login      body: { username, password }
 *   valid     : correct credentials                      → 200 + Set-Cookie jwt
 *   invalid   : wrong credentials                        → 401 + error
 *   invalid   : blank/missing field                      → 400
 *
 * POST /api/auth/logout     (no body)
 *   any       : always                                   → 200 + clears jwt cookie
 *
 * test cases
 *  #   endpoint         scenario                          HTTP status  body / cookie
 *  1   /register        valid new user                    201          message present
 *  2   /register        duplicate username                400          error present
 *  3   /register        missing username field            400          (constraint violation)
 *  4   /register        blank password field              400          (constraint violation)
 *  5   /login           correct credentials               200          Set-Cookie: jwt=...; message present
 *  6   /login           wrong credentials                 401          error present; NO Set-Cookie
 *  7   /login           blank username                    400
 *  8   /logout          any caller                        200          Set-Cookie: jwt="" (cleared)
 */
@WebMvcTest(AuthController.class)
@Import(edu.utdallas.cs3354.whatt.configuration.SecurityConfig.class)
@TestPropertySource(properties = {
        "jwt.expiration=3600000",
        "jwt.cookie.secure=false",
        "jwt.secret=test-secret-key-that-is-32-bytes!!"
})
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private AuthService authService;

    // Required by SecurityConfig beans that MockMvc will load
    @Mock
    private edu.utdallas.cs3354.whatt.security.JwtAuthFilter jwtAuthFilter;

    @Mock
    private edu.utdallas.cs3354.whatt.service.DatabaseUserDetailsService databaseUserDetailsService;

    // register

    @Test
    @DisplayName("TC-1: POST /register with valid data returns 201 and success message")
    void register_validInput_returns201() throws Exception {
        doNothing().when(authService).register("alice", "pass123");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username":"alice","password":"pass123"}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.message").value("User registered successfully"));
    }

    @Test
    @DisplayName("TC-2: POST /register with duplicate username returns 400 and error")
    void register_duplicateUsername_returns400() throws Exception {
        doThrow(new IllegalArgumentException("Username already exists"))
                .when(authService).register("alice", "pass123");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username":"alice","password":"pass123"}
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Username already exists"));
    }

    @Test
    @DisplayName("TC-3: POST /register with missing username returns 400")
    void register_missingUsername_returns400() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"password":"pass123"}
                                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("TC-4: POST /register with blank password returns 400")
    void register_blankPassword_returns400() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username":"alice","password":""}
                                """))
                .andExpect(status().isBadRequest());
    }

    // login

    @Test
    @DisplayName("TC-5: POST /login with correct credentials returns 200 and sets jwt cookie")
    void login_validCredentials_returns200WithCookie() throws Exception {
        when(authService.login("alice", "pass123")).thenReturn("mocked.jwt.token");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username":"alice","password":"pass123"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Login successful"))
                .andExpect(header().string("Set-Cookie", containsString("jwt=")))
                .andExpect(header().string("Set-Cookie", containsString("HttpOnly")));
    }

    @Test
    @DisplayName("TC-6: POST /login with wrong credentials returns 401")
    void login_badCredentials_returns401() throws Exception {
        doThrow(new BadCredentialsException("Bad credentials"))
                .when(authService).login("alice", "wrong");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username":"alice","password":"wrong"}
                                """))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Invalid credentials"));
    }

    @Test
    @DisplayName("TC-7: POST /login with blank username returns 400")
    void login_blankUsername_returns400() throws Exception {
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username":"","password":"pass123"}
                                """))
                .andExpect(status().isBadRequest());
    }

    // logout

    @Test
    @DisplayName("TC-8: POST /logout returns 200 and clears jwt cookie (maxAge=0)")
    void logout_returns200AndClearsCookie() throws Exception {
        mockMvc.perform(post("/api/auth/logout"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Logged out"))
                .andExpect(header().string("Set-Cookie", containsString("jwt=")))
                .andExpect(header().string("Set-Cookie", containsString("Max-Age=0")));
    }
}
