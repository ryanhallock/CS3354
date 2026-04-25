package edu.utdallas.cs3354.whatt;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cs3354.whatt.controller.UserSettingsController;
import edu.utdallas.cs3354.whatt.dto.response.UserSettingsResponse;
import edu.utdallas.cs3354.whatt.entity.embedded.settings.TextSize;
import edu.utdallas.cs3354.whatt.entity.embedded.settings.Theme;
import edu.utdallas.cs3354.whatt.security.JwtAuthFilter;
import edu.utdallas.cs3354.whatt.service.UserSettingsService;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.method.annotation.AuthenticationPrincipalArgumentResolver;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@WebMvcTest(UserSettingsController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(UserSettingsControllerTest.TestMvcConfig.class)
@TestPropertySource(
        properties = {
            "jwt.expiration=3600000",
            "jwt.cookie.secure=false",
            "jwt.secret=test-secret-key-that-is-32-bytes!!"
        })
class UserSettingsControllerTest {

    @TestConfiguration
    static class TestMvcConfig implements WebMvcConfigurer {
        @Override
        public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
            resolvers.add(new AuthenticationPrincipalArgumentResolver());
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserSettingsService userSettingsService;

    @MockitoBean
    private JwtAuthFilter jwtAuthFilter;

    @BeforeEach
    void authenticateAsAlice() {
        UserDetails principal = org.springframework.security.core.userdetails.User.withUsername("alice")
                .password("ignored")
                .authorities("ROLE_USER")
                .build();
        Authentication auth = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    // GET /api/settings

    @Test
    @DisplayName("GET /settings returns 200 and settings body")
    void getSettings_authenticated_returns200() throws Exception {
        UserSettingsResponse response = new UserSettingsResponse(TextSize.MEDIUM, Theme.LIGHT);
        doReturn(response).when(userSettingsService).getSettings("alice");

        mockMvc.perform(get("/api/settings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.textSize").value("MEDIUM"))
                .andExpect(jsonPath("$.theme").value("LIGHT"));
    }

    // PUT /api/settings

    @Test
    @DisplayName("PUT /settings with both fields returns 200 and updated settings")
    void updateSettings_bothFields_returns200() throws Exception {
        UserSettingsResponse updated = new UserSettingsResponse(TextSize.LARGE, Theme.DARK);
        doReturn(updated).when(userSettingsService).updateSettings(eq("alice"), eq(Theme.DARK), eq(TextSize.LARGE));

        mockMvc.perform(put("/api/settings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"theme":"DARK","textSize":"LARGE"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.textSize").value("LARGE"))
                .andExpect(jsonPath("$.theme").value("DARK"));
    }

    @Test
    @DisplayName("PUT /settings with neither field returns 400")
    void updateSettings_neitherField_returns400() throws Exception {
        mockMvc.perform(put("/api/settings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest());
    }

    // PATCH /api/settings/text-size

    @Test
    @DisplayName("PATCH /text-size with valid value returns 200 and updated textSize")
    void updateTextSize_validValue_returns200() throws Exception {
        UserSettingsResponse updated = new UserSettingsResponse(TextSize.X_LARGE, Theme.LIGHT);
        doReturn(updated).when(userSettingsService).updateSettings("alice", TextSize.X_LARGE);

        mockMvc.perform(patch("/api/settings/text-size").param("textSize", "X_LARGE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.textSize").value("X_LARGE"));
    }

    @Test
    @DisplayName("PATCH /text-size with invalid value returns 400")
    void updateTextSize_invalidValue_returns400() throws Exception {
        mockMvc.perform(patch("/api/settings/text-size").param("textSize", "ENORMOUS"))
                .andExpect(status().isBadRequest());
    }

    // PATCH /api/settings/theme

    @Test
    @DisplayName("PATCH /theme with valid value returns 200 and updated theme")
    void updateTheme_validValue_returns200() throws Exception {
        UserSettingsResponse updated = new UserSettingsResponse(TextSize.MEDIUM, Theme.DARK);
        doReturn(updated).when(userSettingsService).updateSettings("alice", Theme.DARK);

        mockMvc.perform(patch("/api/settings/theme").param("theme", "DARK"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.theme").value("DARK"));
    }

    @Test
    @DisplayName("PATCH /theme with invalid value returns 400")
    void updateTheme_invalidValue_returns400() throws Exception {
        mockMvc.perform(patch("/api/settings/theme").param("theme", "NEON")).andExpect(status().isBadRequest());
    }
}
