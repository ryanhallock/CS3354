package edu.utdallas.cs3354.whatt.service;

import edu.utdallas.cs3354.whatt.entity.Flashcard;
import edu.utdallas.cs3354.whatt.repository.FlashcardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class FlashcardService {
    private final FlashcardRepository flashcardRepository;

    @Autowired
    public FlashcardService(FlashcardRepository flashcardRepository) {
        this.flashcardRepository = flashcardRepository;
    }

    public Iterable<Flashcard> getFlashcards() {
        return flashcardRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }
}
