package edu.utdallas.cs3354.whatt;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cs3354.whatt.controller.UserController;
import edu.utdallas.cs3354.whatt.entity.User;
import edu.utdallas.cs3354.whatt.security.JwtAuthFilter;
import edu.utdallas.cs3354.whatt.security.Role;
import edu.utdallas.cs3354.whatt.service.FlashcardSetService;
import edu.utdallas.cs3354.whatt.service.UserService;
import java.time.Instant;
import java.util.List;
import java.util.Set;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.method.annotation.AuthenticationPrincipalArgumentResolver;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(UserControllerTest.TestMvcConfig.class)
class UserControllerTest {

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
    private UserService userService;

    @MockitoBean
    private FlashcardSetService flashcardSetService;

    @MockitoBean
    private JwtAuthFilter jwtAuthFilter;

    private void mockAuth() {
        UserDetails principal = org.springframework.security.core.userdetails.User.withUsername("alice")
                .password("ignored")
                .authorities("ROLE_USER")
                .build();
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Test
    @DisplayName("GET /api/user/me -> returns current user profile")
    void me_returnsProfile() throws Exception {
        mockAuth();
        User alice = new User();
        alice.setUsername("alice");
        alice.setCreatedAt(Instant.now());

        when(userService.getUserByUsername("alice")).thenReturn(alice);

        mockMvc.perform(get("/api/user/me"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("alice"))
                .andExpect(jsonPath("$.createdAt").exists());
    }

    @Test
    @DisplayName("GET /api/user/{username} -> returns public profile")
    void publicProfile_returnsProfile() throws Exception {
        User bob = new User();
        bob.setUsername("bob");
        bob.setCreatedAt(Instant.now());
        bob.setRoles(Set.of(Role.USER));

        when(userService.getUserByUsername("bob")).thenReturn(bob);
        when(flashcardSetService.hasPublicSets("bob")).thenReturn(true);

        mockMvc.perform(get("/api/user/bob"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("bob"))
                .andExpect(jsonPath("$.createdAt").exists());
    }

    @Test
    @DisplayName("GET /api/user/{username} -> returns 403 if profile is private")
    void publicProfile_returns403IfPrivate() throws Exception {
        User bob = new User();
        bob.setUsername("bob");
        bob.setRoles(Set.of(Role.USER));
        when(userService.getUserByUsername("bob")).thenReturn(bob);
        when(flashcardSetService.hasPublicSets("bob")).thenReturn(false);

        mockMvc.perform(get("/api/user/bob")).andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("GET /api/user/{username} -> returns 403 if target is admin but has no public sets")
    void publicProfile_returns403IfTargetIsAdminWithNoSets() throws Exception {
        User bob = new User();
        bob.setUsername("bob");
        bob.setRoles(Set.of(Role.USER, Role.ADMIN));
        bob.setCreatedAt(Instant.now());
        when(userService.getUserByUsername("bob")).thenReturn(bob);
        when(flashcardSetService.hasPublicSets("bob")).thenReturn(false);

        mockMvc.perform(get("/api/user/bob")).andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("GET /api/user/{username} -> returns profile if viewer is admin")
    void publicProfile_returnsProfileIfViewerIsAdmin() throws Exception {
        UserDetails principal = org.springframework.security.core.userdetails.User.withUsername("admin")
                .password("ignored")
                .authorities("ROLE_USER", "ROLE_ADMIN")
                .build();
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        try {
            User bob = new User();
            bob.setUsername("bob");
            bob.setRoles(Set.of(Role.USER));
            bob.setCreatedAt(Instant.now());
            when(userService.getUserByUsername("bob")).thenReturn(bob);
            when(flashcardSetService.hasPublicSets("bob")).thenReturn(false);

            mockMvc.perform(get("/api/user/bob"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.username").value("bob"));
        } finally {
            SecurityContextHolder.clearContext();
        }
    }
}
