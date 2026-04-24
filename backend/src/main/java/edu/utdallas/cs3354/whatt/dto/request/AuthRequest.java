package edu.utdallas.cs3354.whatt.dto.request;

import jakarta.validation.constraints.NotBlank;

public record AuthRequest(
        @NotBlank String username, @NotBlank String password) {}
