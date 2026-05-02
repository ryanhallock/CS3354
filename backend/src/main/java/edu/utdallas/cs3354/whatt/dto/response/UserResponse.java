package edu.utdallas.cs3354.whatt.dto.response;

import java.time.Instant;

public record UserResponse(String username, Instant createdAt) {}
