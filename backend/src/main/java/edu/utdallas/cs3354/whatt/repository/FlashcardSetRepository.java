package edu.utdallas.cs3354.whatt.repository;

import edu.utdallas.cs3354.whatt.entity.FlashcardSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FlashcardSetRepository extends JpaRepository<FlashcardSet, Long> {
	List<FlashcardSet> findAllByOwnerUsernameOrderByIdDesc(String ownerUsername);

	List<FlashcardSet> findAllByVisibilityOrderByIdDesc(FlashcardSet.Visibility visibility);

	Optional<FlashcardSet> findByIdAndOwnerUsername(Long id, String ownerUsername);
}
