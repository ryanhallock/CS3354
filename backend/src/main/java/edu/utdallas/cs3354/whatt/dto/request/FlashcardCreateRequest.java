package edu.utdallas.cs3354.whatt.dto.request;

import jakarta.validation.constraints.NotBlank;

public record FlashcardCreateRequest(
        @NotBlank String front, @NotBlank String back) {}
