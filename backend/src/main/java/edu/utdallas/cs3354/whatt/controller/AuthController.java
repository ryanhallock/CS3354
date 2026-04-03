package edu.utdallas.cs3354.whatt.controller;

import edu.utdallas.cs3354.whatt.dto.AuthRequest;
import edu.utdallas.cs3354.whatt.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final String JWT_COOKIE_NAME = "jwt";

    private final AuthService authService;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    @Value("${jwt.cookie.secure}")
    private boolean cookieSecure;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody AuthRequest request) {
        try {
            authService.register(request.getUsername(), request.getPassword());
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "User registered successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody AuthRequest request,
                                                     HttpServletResponse response) {
        try {
            String token = authService.login(request.getUsername(), request.getPassword());
            response.addHeader(HttpHeaders.SET_COOKIE, buildJwtCookie(token, jwtExpiration / 1000).toString());
            return ResponseEntity.ok(Map.of("message", "Login successful"));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletResponse response) {
        response.addHeader(HttpHeaders.SET_COOKIE, buildJwtCookie("", 0).toString());
        return ResponseEntity.ok(Map.of("message", "Logged out"));
    }

    private ResponseCookie buildJwtCookie(String value, long maxAgeSeconds) {
        return ResponseCookie.from(JWT_COOKIE_NAME, value)
                .httpOnly(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(maxAgeSeconds)
                .secure(cookieSecure)
                .build();
    }
}
