package edu.utdallas.cs3354.whatt.controller;

import edu.utdallas.cs3354.whatt.dto.request.UserSettingsRequest;
import edu.utdallas.cs3354.whatt.dto.response.UserSettingsResponse;
import edu.utdallas.cs3354.whatt.entity.embedded.settings.TextSize;
import edu.utdallas.cs3354.whatt.entity.embedded.settings.Theme;
import edu.utdallas.cs3354.whatt.service.UserSettingsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@PreAuthorize("isAuthenticated()")
public class UserSettingsController {

    private final UserSettingsService service;

    @Autowired
    public UserSettingsController(UserSettingsService service) {
        this.service = service;
    }

    // GET /api/settings
    @GetMapping
    public ResponseEntity<UserSettingsResponse> getSettings(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(service.getSettings(userDetails.getUsername()));
    }

    // PUT /api/settings
    @PutMapping
    public ResponseEntity<UserSettingsResponse> updateSettings(
            @AuthenticationPrincipal UserDetails userDetails, @Valid @RequestBody UserSettingsRequest request) {
        return ResponseEntity.ok(
                service.updateSettings(userDetails.getUsername(), request.theme(), request.textSize()));
    }

    // PATCH /api/settings/text-size
    @PatchMapping("/text-size")
    public ResponseEntity<UserSettingsResponse> updateTextSize(
            @AuthenticationPrincipal UserDetails userDetails, @Valid @RequestParam TextSize textSize) {
        return ResponseEntity.ok(service.updateSettings(userDetails.getUsername(), textSize));
    }

    // PATCH /api/settings/theme
    @PatchMapping("/theme")
    public ResponseEntity<UserSettingsResponse> updateTheme(
            @AuthenticationPrincipal UserDetails userDetails, @Valid @RequestParam Theme theme) {
        return ResponseEntity.ok(service.updateSettings(userDetails.getUsername(), theme));
    }
}
