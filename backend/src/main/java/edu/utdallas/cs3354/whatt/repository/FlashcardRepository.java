package edu.utdallas.cs3354.whatt.repository;

import edu.utdallas.cs3354.whatt.entity.Flashcard;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface FlashcardRepository extends PagingAndSortingRepository<Flashcard, Long> {
}
