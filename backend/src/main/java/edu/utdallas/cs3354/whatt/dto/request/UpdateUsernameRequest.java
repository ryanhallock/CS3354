package edu.utdallas.cs3354.whatt.dto.request;

import jakarta.validation.constraints.NotBlank;

public record UpdateUsernameRequest(@NotBlank String newUsername) {}
