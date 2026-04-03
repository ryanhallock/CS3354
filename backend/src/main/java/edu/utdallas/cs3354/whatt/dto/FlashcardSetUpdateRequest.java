package edu.utdallas.cs3354.whatt.dto;

import edu.utdallas.cs3354.whatt.entity.FlashcardSet;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record FlashcardSetUpdateRequest(
        @NotBlank String title,
        @NotNull FlashcardSet.Visibility visibility,
        @NotNull @Size(min = 1) List<@Valid FlashcardRequest> flashcards
) {
}

