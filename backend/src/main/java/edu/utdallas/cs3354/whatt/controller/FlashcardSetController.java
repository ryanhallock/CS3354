package edu.utdallas.cs3354.whatt.controller;

import edu.utdallas.cs3354.whatt.dto.FlashcardSetCreateRequest;
import edu.utdallas.cs3354.whatt.dto.FlashcardSetResponse;
import edu.utdallas.cs3354.whatt.dto.FlashcardSetUpdateRequest;
import edu.utdallas.cs3354.whatt.service.FlashcardSetService;
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
@RequestMapping("/api/flashcardset")
@PreAuthorize("isAuthenticated()")
public class FlashcardSetController {
    private final FlashcardSetService flashcardSetService;

    @Autowired
    public FlashcardSetController(FlashcardSetService flashcardSetService) {
        this.flashcardSetService = flashcardSetService;
    }

    @PostMapping
    public ResponseEntity<FlashcardSetResponse> createSet(
            @AuthenticationPrincipal UserDetails userDetails, @Valid @RequestBody FlashcardSetCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(flashcardSetService.createSet(userDetails.getUsername(), request));
    }

    @GetMapping
    public ResponseEntity<List<FlashcardSetResponse>> getOwnSets(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(flashcardSetService.getOwnSets(userDetails.getUsername()));
    }

    @GetMapping("/public")
    public ResponseEntity<List<FlashcardSetResponse>> getPublicSets() {
        return ResponseEntity.ok(flashcardSetService.getPublicSets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlashcardSetResponse> getById(
            @AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        return ResponseEntity.ok(flashcardSetService.getVisibleSetById(userDetails.getUsername(), id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FlashcardSetResponse> updateSet(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @Valid @RequestBody FlashcardSetUpdateRequest request) {
        return ResponseEntity.ok(flashcardSetService.updateOwnSet(userDetails.getUsername(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSet(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        flashcardSetService.deleteOwnSet(userDetails.getUsername(), id);
        return ResponseEntity.noContent().build();
    }
}
