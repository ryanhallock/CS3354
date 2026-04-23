package edu.utdallas.cs3354.whatt.dto;

import jakarta.validation.constraints.NotBlank;

public record FlashcardRequest(
        @NotBlank String question, @NotBlank String answer) {}
