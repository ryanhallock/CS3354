package edu.utdallas.cs3354.whatt.controller;


import edu.utdallas.cs3354.whatt.entity.Flashcard;
import edu.utdallas.cs3354.whatt.service.FlashcardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/flashcard")
public class FlashcardController {
    private final FlashcardService flashcardService;

    @Autowired
    public FlashcardController(FlashcardService flashcardService) {
        this.flashcardService = flashcardService;
    }

    @GetMapping
    public Iterable<Flashcard> getAllFlashcards() {
        return flashcardService.getFlashcards();
    }
}
