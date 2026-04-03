package edu.utdallas.cs3354.whatt.service;

import edu.utdallas.cs3354.whatt.dto.FlashcardRequest;
import edu.utdallas.cs3354.whatt.dto.FlashcardResponse;
import edu.utdallas.cs3354.whatt.entity.Flashcard;
import edu.utdallas.cs3354.whatt.entity.FlashcardSet;
import edu.utdallas.cs3354.whatt.repository.FlashcardRepository;
import edu.utdallas.cs3354.whatt.repository.FlashcardSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FlashcardService {
    private final FlashcardRepository flashcardRepository;
    private final FlashcardSetRepository flashcardSetRepository;

    @Autowired
    public FlashcardService(FlashcardRepository flashcardRepository, FlashcardSetRepository flashcardSetRepository) {
        this.flashcardRepository = flashcardRepository;
        this.flashcardSetRepository = flashcardSetRepository;
    }

    @Transactional
    public FlashcardResponse createCardInOwnSet(String username, Long setId, FlashcardRequest request) {
        FlashcardSet set = getSetById(setId);
        assertOwnsSet(username, set);

        Flashcard card = new Flashcard();
        card.setQuestion(request.question());
        card.setAnswer(request.answer());
        card.setFlashcardSet(set);

        return toResponse(flashcardRepository.save(card));
    }

    @Transactional(readOnly = true)
    public List<FlashcardResponse> getCardsInVisibleSet(String username, Long setId) {
        FlashcardSet set = getSetById(setId);
        assertCanAccessSet(username, set);

        return flashcardRepository.findAllByFlashcardSetIdOrderByIdAsc(setId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public FlashcardResponse getVisibleCardById(String username, Long id) {
        Flashcard card = getCardById(id);
        assertCanAccessSet(username, card.getFlashcardSet());
        return toResponse(card);
    }

    @Transactional
    public FlashcardResponse updateOwnCard(String username, Long id, FlashcardRequest request) {
        Flashcard card = flashcardRepository.findByIdAndFlashcardSetOwnerUsername(id, username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flashcard not found"));

        card.setQuestion(request.question());
        card.setAnswer(request.answer());
        return toResponse(flashcardRepository.save(card));
    }

    @Transactional
    public void deleteOwnCard(String username, Long id) {
        Flashcard card = flashcardRepository.findByIdAndFlashcardSetOwnerUsername(id, username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flashcard not found"));
        flashcardRepository.delete(card);
    }

    private FlashcardSet getSetById(Long setId) {
        return flashcardSetRepository.findById(setId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flashcard set not found"));
    }

    private Flashcard getCardById(Long id) {
        return flashcardRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flashcard not found"));
    }

    private void assertCanAccessSet(String username, FlashcardSet set) {
        if (set.getVisibility() == FlashcardSet.Visibility.PUBLIC) {
            return;
        }
        assertOwnsSet(username, set);
    }

    private void assertOwnsSet(String username, FlashcardSet set) {
        if (!set.getOwner().getUsername().equals(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have access to this flashcard set");
        }
    }

    private FlashcardResponse toResponse(Flashcard card) {
        return new FlashcardResponse(card.getId(), card.getQuestion(), card.getAnswer());
    }
}
