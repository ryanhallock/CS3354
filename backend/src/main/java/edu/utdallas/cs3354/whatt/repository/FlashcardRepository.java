package edu.utdallas.cs3354.whatt.repository;

import edu.utdallas.cs3354.whatt.entity.Flashcard;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlashcardRepository extends JpaRepository<Flashcard, Long> {
    List<Flashcard> findAllByFlashcardSetIdOrderByIdAsc(Long flashcardSetId);

    Optional<Flashcard> findByIdAndFlashcardSetOwnerUsername(Long id, String ownerUsername);
}
