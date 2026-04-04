package edu.utdallas.cs3354.whatt;

import edu.utdallas.cs3354.whatt.controller.AuthController;
import edu.utdallas.cs3354.whatt.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static io.jsonwebtoken.security.Jwks.json;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


 // Web-layer tests for AuthController using MockMvc.

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
    @InjectMocks
    private AuthController authController;
    @Mock
    private edu.utdallas.cs3354.whatt.security.JwtAuthFilter jwtAuthFilter;

    @Mock
    private edu.utdallas.cs3354.whatt.service.DatabaseUserDetailsService databaseUserDetailsService;

    // register

    @Test
    @DisplayName("TC1: POST /register with valid data returns 201 and success message")
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
    @DisplayName("TC3: POST /register with missing username returns 400")
    void register_missingUsername_returns400() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"password":"pass123"}
                                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("TC4: POST /register with blank password returns 400")
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
    @DisplayName("TC5: POST /login with correct credentials returns 200 and sets jwt cookie")
    void login_validCredentials_returns200WithCookie() throws Exception {
        doReturn("mocked.jwt.token").when(authService).login("alice", "pass123");

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
    @DisplayName("TC6: POST /login with wrong credentials returns 401")
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
    @DisplayName("TC7: POST /login with blank username returns 400")
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
    @DisplayName("TC8: POST /logout returns 200 and clears jwt cookie (maxAge=0)")
    void logout_returns200AndClearsCookie() throws Exception {
        mockMvc.perform(post("/api/auth/logout"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Logged out"))
                .andExpect(header().string("Set-Cookie", containsString("jwt=")))
                .andExpect(header().string("Set-Cookie", containsString("Max-Age=0")));
    }
}
