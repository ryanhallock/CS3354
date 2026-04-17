package edu.utdallas.cs3354.whatt.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateUsernameRequest(@NotBlank String newUsername) {}
