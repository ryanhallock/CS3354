package edu.utdallas.cs3354.whatt.service;

import edu.utdallas.cs3354.whatt.dto.request.FlashcardRequest;
import edu.utdallas.cs3354.whatt.dto.request.FlashcardSetCreateRequest;
import edu.utdallas.cs3354.whatt.dto.request.FlashcardSetUpdateRequest;
import edu.utdallas.cs3354.whatt.dto.response.FlashcardResponse;
import edu.utdallas.cs3354.whatt.dto.response.FlashcardSetResponse;
import edu.utdallas.cs3354.whatt.entity.Flashcard;
import edu.utdallas.cs3354.whatt.entity.FlashcardSet;
import edu.utdallas.cs3354.whatt.entity.User;
import edu.utdallas.cs3354.whatt.repository.FlashcardSetRepository;
import edu.utdallas.cs3354.whatt.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class FlashcardSetService {
    private final FlashcardSetRepository flashcardSetRepository;
    private final UserRepository userRepository;

    @Autowired
    public FlashcardSetService(FlashcardSetRepository flashcardSetRepository, UserRepository userRepository) {
        this.flashcardSetRepository = flashcardSetRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public FlashcardSetResponse createSet(String username, FlashcardSetCreateRequest request) {
        User owner = getUserByUsername(username);

        FlashcardSet flashcardSet = new FlashcardSet();
        flashcardSet.setOwner(owner);
        flashcardSet.setDescription(request.description());
        flashcardSet.setTitle(request.title());
        flashcardSet.setVisibility(request.visibility());

        replaceFlashcards(flashcardSet, request.flashcards());
        return toResponse(flashcardSetRepository.save(flashcardSet));
    }

    @Transactional(readOnly = true)
    public List<FlashcardSetResponse> getOwnSets(String username) {
        return flashcardSetRepository.findAllByOwnerUsernameOrderByIdDesc(username).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<FlashcardSetResponse> getPublicSets() {
        return flashcardSetRepository.findAllByVisibilityOrderByIdDesc(FlashcardSet.Visibility.PUBLIC).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<FlashcardSetResponse> getPublicSetsByUser(String username) {
        return flashcardSetRepository
                .findAllByOwnerUsernameAndVisibilityOrderByIdDesc(username, FlashcardSet.Visibility.PUBLIC)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public boolean hasPublicSets(String username) {
        return flashcardSetRepository.countByOwnerUsernameAndVisibility(username, FlashcardSet.Visibility.PUBLIC) > 0;
    }

    @Transactional(readOnly = true)
    public FlashcardSetResponse getVisibleSetById(String username, Long id) {
        FlashcardSet flashcardSet = getSetById(id);
        boolean isOwner = flashcardSet.getOwner().getUsername().equals(username);
        if (!isOwner && flashcardSet.getVisibility() != FlashcardSet.Visibility.PUBLIC) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have access to this flashcard set");
        }
        return toResponse(flashcardSet);
    }

    @Transactional
    public FlashcardSetResponse updateOwnSet(String username, Long id, FlashcardSetUpdateRequest request) {
        FlashcardSet flashcardSet = flashcardSetRepository
                .findByIdAndOwnerUsername(id, username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flashcard set not found"));

        flashcardSet.setTitle(request.title());
        flashcardSet.setVisibility(request.visibility());
        replaceFlashcards(flashcardSet, request.flashcards());

        return toResponse(flashcardSetRepository.save(flashcardSet));
    }

    @Transactional
    public void deleteOwnSet(String username, Long id) {
        FlashcardSet flashcardSet = flashcardSetRepository
                .findByIdAndOwnerUsername(id, username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flashcard set not found"));
        flashcardSetRepository.delete(flashcardSet);
    }

    private User getUserByUsername(String username) {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private FlashcardSet getSetById(Long id) {
        return flashcardSetRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flashcard set not found"));
    }

    private void replaceFlashcards(FlashcardSet set, List<FlashcardRequest> flashcardRequests) {
        set.getFlashcards().clear();
        for (var request : flashcardRequests) {
            Flashcard flashcard = new Flashcard();
            flashcard.setQuestion(request.question());
            flashcard.setAnswer(request.answer());
            flashcard.setFlashcardSet(set);
            set.getFlashcards().add(flashcard);
        }
    }

    private FlashcardSetResponse toResponse(FlashcardSet set) {
        List<FlashcardResponse> flashcards = set.getFlashcards().stream()
                .map(card -> new FlashcardResponse(card.getId(), card.getQuestion(), card.getAnswer()))
                .toList();

        return new FlashcardSetResponse(
                set.getId(),
                set.getTitle(),
                set.getDescription(),
                set.getVisibility(),
                set.getOwner().getUsername(),
                set.getCreatedAt(),
                flashcards);
    }
}
