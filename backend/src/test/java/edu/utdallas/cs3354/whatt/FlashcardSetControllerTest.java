package edu.utdallas.cs3354.whatt;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cs3354.whatt.controller.FlashcardSetController;
import edu.utdallas.cs3354.whatt.dto.response.FlashcardSetResponse;
import edu.utdallas.cs3354.whatt.entity.FlashcardSet;
import edu.utdallas.cs3354.whatt.security.JwtAuthFilter;
import edu.utdallas.cs3354.whatt.service.FlashcardSetService;
import java.util.List;
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
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web-layer tests for FlashcardSetController using MockMvc.
 * POST /api/flashcardset             body: { title, description, visibility, flashcards }
 *   valid     : title present, valid data                    → 201
 *   invalid   : blank/missing title                          → 400
 *
 * GET /api/flashcardset (own sets)
 *   any       : returns list of user's sets                  → 200
 *
 * GET /api/flashcardset/public
 *   any       : returns list of public sets                  → 200
 *
 * GET /api/flashcardset/{id}
 *   any       : returns specific set if visible              → 200
 *
 * PUT /api/flashcardset/{id}         body: { title, description, visibility }
 *   valid     : valid data                                   → 200
 *   invalid   : missing title                                → 400
 *
 * DELETE /api/flashcardset/{id}
 *   any       : deletes the set if owner                     → 204
 *
 * test cases
 *  #   endpoint                 scenario                     HTTP status
 *  1   POST   /                   valid new set              201
 *  2   POST   /                   missing title              400
 *  3   GET    /                   retrieve own sets          200
 *  4   GET    /public             retrieve public sets       200
 *  5   GET    /{id}               retrieve specific set      200
 *  6   PUT    /{id}               valid update               200
 *  7   PUT    /{id}               missing title              400
 *  8   DELETE /{id}               delete set                 204
 */
@WebMvcTest(FlashcardSetController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(FlashcardSetControllerTest.TestMvcConfig.class)
class FlashcardSetControllerTest {

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
    @DisplayName("TC1: Create Valid Set -> HTTP 201")
    void createSet_valid_returns201() throws Exception {
        mockAuth();

        FlashcardSetResponse response = new FlashcardSetResponse(
                1L,
                "CS3354 Midterm",
                "Software Engineering concepts",
                FlashcardSet.Visibility.PRIVATE,
                "alice",
                java.time.Instant.now(),
                List.of());

        doReturn(response).when(flashcardSetService).createSet(eq("alice"), any());

        mockMvc.perform(post("/api/flashcardset")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "CS3354 Midterm",
                                  "description": "Software Engineering concepts",
                                  "visibility": "PRIVATE",
                                  "flashcards": [
                                    { "question": "Q", "answer": "A" }
                                  ]
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("CS3354 Midterm"));
    }

    @Test
    @DisplayName("TC2: Create Missing Title -> HTTP 400")
    void createSet_missingTitle_returns400() throws Exception {
        mockAuth();
        mockMvc.perform(post("/api/flashcardset")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "",
                                  "description": "Software Engineering concepts",
                                  "visibility": "PRIVATE",
                                  "flashcards": [
                                    { "question": "Q", "answer": "A" }
                                  ]
                                }
                                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("TC3: GET / (Own Sets) -> HTTP 200")
    void getOwnSets_returns200() throws Exception {
        mockAuth();
        FlashcardSetResponse response = new FlashcardSetResponse(
                1L, "My Set", "Desc", FlashcardSet.Visibility.PRIVATE, "alice", null, List.of());
        doReturn(List.of(response)).when(flashcardSetService).getOwnSets("alice");

        mockMvc.perform(get("/api/flashcardset"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].title").value("My Set"));
    }

    @Test
    @DisplayName("TC4: GET /public -> HTTP 200")
    void getPublicSets_returns200() throws Exception {
        mockAuth();
        FlashcardSetResponse response = new FlashcardSetResponse(
                2L, "Public Set", "Desc", FlashcardSet.Visibility.PUBLIC, "bob", null, List.of());
        doReturn(List.of(response)).when(flashcardSetService).getPublicSets();

        mockMvc.perform(get("/api/flashcardset/public"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Public Set"));
    }

    @Test
    @DisplayName("TC5: GET /{id} -> HTTP 200")
    void getSetById_returns200() throws Exception {
        mockAuth();
        FlashcardSetResponse response = new FlashcardSetResponse(
                1L, "Target Set", "Desc", FlashcardSet.Visibility.PRIVATE, "alice", null, List.of());
        doReturn(response).when(flashcardSetService).getVisibleSetById("alice", 1L);

        mockMvc.perform(get("/api/flashcardset/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Target Set"));
    }

    @Test
    @DisplayName("TC6: PUT /{id} valid update -> HTTP 200")
    void updateSet_valid_returns200() throws Exception {
        mockAuth();
        FlashcardSetResponse response = new FlashcardSetResponse(
                1L, "Updated Set", "New Desc", FlashcardSet.Visibility.PUBLIC, "alice", null, List.of());
        doReturn(response).when(flashcardSetService).updateOwnSet(eq("alice"), eq(1L), any());

        mockMvc.perform(put("/api/flashcardset/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "Updated Set",
                                  "description": "New Desc",
                                  "visibility": "PUBLIC",
                                  "flashcards": [
                                    { "question": "Q", "answer": "A" }
                                  ]
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Set"));
    }

    @Test
    @DisplayName("TC7: PUT /{id} missing title -> HTTP 400")
    void updateSet_invalid_returns400() throws Exception {
        mockAuth();
        mockMvc.perform(put("/api/flashcardset/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "",
                                  "description": "New Desc",
                                  "visibility": "PUBLIC",
                                  "flashcards": [
                                    { "question": "Q", "answer": "A" }
                                  ]
                                }
                                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("TC8: DELETE /{id} -> HTTP 204")
    void deleteSet_returns204() throws Exception {
        mockAuth();
        doNothing().when(flashcardSetService).deleteOwnSet("alice", 1L);

        mockMvc.perform(delete("/api/flashcardset/1")).andExpect(status().isNoContent());
    }
}
