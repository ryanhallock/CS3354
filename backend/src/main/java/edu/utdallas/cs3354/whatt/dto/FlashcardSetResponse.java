package edu.utdallas.cs3354.whatt.dto;

import edu.utdallas.cs3354.whatt.entity.FlashcardSet;

import java.util.List;

public record FlashcardSetResponse(
        Long id,
        String title,
        String description,
        FlashcardSet.Visibility visibility,
        String owner,
        List<FlashcardResponse> flashcards
) {
}

