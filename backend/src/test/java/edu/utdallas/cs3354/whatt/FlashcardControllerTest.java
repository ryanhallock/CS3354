package edu.utdallas.cs3354.whatt;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cs3354.whatt.controller.FlashcardController;
import edu.utdallas.cs3354.whatt.dto.FlashcardRequest;
import edu.utdallas.cs3354.whatt.dto.FlashcardResponse;
import edu.utdallas.cs3354.whatt.security.JwtAuthFilter;
import edu.utdallas.cs3354.whatt.service.FlashcardService;
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
 * Web-layer tests for FlashcardController using MockMvc.
 * POST /api/flashcard/set/{setId}   body: { question, answer }
 *   valid     : both fields present                          → 201
 *   invalid   : blank/missing field (@NotBlank)              → 400
 *
 * GET /api/flashcard/set/{setId}
 *   any       : returns list of flashcards                   → 200
 *
 * GET /api/flashcard/{id}
 *   any       : returns single flashcard                     → 200
 *
 * PUT /api/flashcard/{id}           body: { question, answer }
 *   valid     : both fields present                          → 200
 *   invalid   : blank/missing field                          → 400
 *
 * DELETE /api/flashcard/{id}
 *   any       : deletes the flashcard                        → 204
 *
 * test cases
 *  #   endpoint                 scenario                     HTTP status
 *  1   POST   /set/{setId}      valid new card               201
 *  2   POST   /set/{setId}      missing question             400
 *  3   GET    /set/{setId}      retrieve cards               200
 *  4   GET    /{id}             retrieve card                200
 *  5   PUT    /{id}             valid update                 200
 *  6   PUT    /{id}             missing answer               400
 *  7   DELETE /{id}             delete card                  204
 */
@WebMvcTest(FlashcardController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(FlashcardControllerTest.TestMvcConfig.class)
class FlashcardControllerTest {

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
    private FlashcardService flashcardService;

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
    @DisplayName("TC1: Add Valid Card -> HTTP 201")
    void addCard_valid_returns201() throws Exception {
        mockAuth();
        FlashcardResponse response = new FlashcardResponse(100L, "What is TDD?", "Test Driven Development");

        doReturn(response).when(flashcardService).createCardInOwnSet(eq("alice"), eq(1L), any(FlashcardRequest.class));

        mockMvc.perform(post("/api/flashcard/set/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "question": "What is TDD?",
                                  "answer": "Test Driven Development"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(100))
                .andExpect(jsonPath("$.question").value("What is TDD?"));
    }

    @Test
    @DisplayName("TC2: Empty Front Text -> HTTP 400")
    void addCard_emptyFront_returns400() throws Exception {
        mockAuth();
        mockMvc.perform(post("/api/flashcard/set/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "question": "",
                                  "answer": "Answer"
                                }
                                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("TC3: GET /set/{setId} -> HTTP 200")
    void getCardsBySet_returns200() throws Exception {
        mockAuth();
        FlashcardResponse card = new FlashcardResponse(100L, "Q", "A");
        doReturn(List.of(card)).when(flashcardService).getCardsInVisibleSet("alice", 1L);

        mockMvc.perform(get("/api/flashcard/set/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(100))
                .andExpect(jsonPath("$[0].question").value("Q"));
    }

    @Test
    @DisplayName("TC4: GET /{id} -> HTTP 200")
    void getCard_returns200() throws Exception {
        mockAuth();
        FlashcardResponse card = new FlashcardResponse(100L, "Q", "A");
        doReturn(card).when(flashcardService).getVisibleCardById("alice", 100L);

        mockMvc.perform(get("/api/flashcard/100"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(100))
                .andExpect(jsonPath("$.question").value("Q"));
    }

    @Test
    @DisplayName("TC5: PUT /{id} Valid -> HTTP 200")
    void updateCard_valid_returns200() throws Exception {
        mockAuth();
        FlashcardResponse response = new FlashcardResponse(100L, "Updated Q?", "Updated A");
        doReturn(response).when(flashcardService).updateOwnCard(eq("alice"), eq(100L), any(FlashcardRequest.class));

        mockMvc.perform(put("/api/flashcard/100")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "question": "Updated Q?",
                                  "answer": "Updated A"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.question").value("Updated Q?"));
    }

    @Test
    @DisplayName("TC6: PUT /{id} Missing Answer -> HTTP 400")
    void updateCard_missingAnswer_returns400() throws Exception {
        mockAuth();
        mockMvc.perform(put("/api/flashcard/100")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "question": "Updated Q?",
                                  "answer": ""
                                }
                                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("TC7: DELETE /{id} -> HTTP 204")
    void deleteCard_returns204() throws Exception {
        mockAuth();
        doNothing().when(flashcardService).deleteOwnCard("alice", 100L);

        mockMvc.perform(delete("/api/flashcard/100")).andExpect(status().isNoContent());
    }
}
