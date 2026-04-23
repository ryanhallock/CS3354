package edu.utdallas.cs3354.whatt.controller;

import edu.utdallas.cs3354.whatt.dto.request.FlashcardRequest;
import edu.utdallas.cs3354.whatt.dto.response.FlashcardResponse;
import edu.utdallas.cs3354.whatt.service.FlashcardService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/flashcard")
@PreAuthorize("isAuthenticated()")
public class FlashcardController {
    private final FlashcardService flashcardService;

    @Autowired
    public FlashcardController(FlashcardService flashcardService) {
        this.flashcardService = flashcardService;
    }

    @PostMapping("/set/{setId}")
    public ResponseEntity<FlashcardResponse> createCard(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long setId,
            @Valid @RequestBody FlashcardRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(flashcardService.createCardInOwnSet(userDetails.getUsername(), setId, request));
    }

    @GetMapping("/set/{setId}")
    public ResponseEntity<List<FlashcardResponse>> getCardsBySet(
            @AuthenticationPrincipal UserDetails userDetails, @PathVariable Long setId) {
        return ResponseEntity.ok(flashcardService.getCardsInVisibleSet(userDetails.getUsername(), setId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlashcardResponse> getCard(
            @AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        return ResponseEntity.ok(flashcardService.getVisibleCardById(userDetails.getUsername(), id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FlashcardResponse> updateCard(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @Valid @RequestBody FlashcardRequest request) {
        return ResponseEntity.ok(flashcardService.updateOwnCard(userDetails.getUsername(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCard(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        flashcardService.deleteOwnCard(userDetails.getUsername(), id);
        return ResponseEntity.noContent().build();
    }
}
