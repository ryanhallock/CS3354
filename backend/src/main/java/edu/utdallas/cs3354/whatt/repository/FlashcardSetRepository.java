package edu.utdallas.cs3354.whatt.repository;

import edu.utdallas.cs3354.whatt.entity.FlashcardSet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlashcardSetRepository extends JpaRepository<FlashcardSet, Long> {
}
