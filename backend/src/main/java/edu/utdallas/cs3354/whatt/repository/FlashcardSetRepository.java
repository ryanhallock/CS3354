package edu.utdallas.cs3354.whatt.repository;

import edu.utdallas.cs3354.whatt.entity.FlashcardSet;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlashcardSetRepository extends JpaRepository<FlashcardSet, Long> {
    List<FlashcardSet> findAllByOwnerUsernameOrderByIdDesc(String ownerUsername);

    List<FlashcardSet> findAllByVisibilityOrderByIdDesc(FlashcardSet.Visibility visibility);

    List<FlashcardSet> findAllByOwnerUsernameAndVisibilityOrderByIdDesc(
            String ownerUsername, FlashcardSet.Visibility visibility);

    long countByOwnerUsernameAndVisibility(String ownerUsername, FlashcardSet.Visibility visibility);

    Optional<FlashcardSet> findByIdAndOwnerUsername(Long id, String ownerUsername);
}
