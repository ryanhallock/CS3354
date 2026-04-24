package edu.utdallas.cs3354.whatt.controller;

import edu.utdallas.cs3354.whatt.dto.request.UserSettingsRequest;
import edu.utdallas.cs3354.whatt.dto.response.UserSettingsResponse;
import edu.utdallas.cs3354.whatt.service.UserSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
public class UserSettingsController {

    private final UserSettingsService service;

    @Autowired
    public UserSettingsController(UserSettingsService service) {
        this.service = service;
    }

    // GET /api/settings
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserSettingsResponse> getSettings(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(service.getSettings(userDetails.getUsername()));
    }

    // PUT /api/settings
    @PutMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserSettingsResponse> updateSettings(
            @AuthenticationPrincipal UserDetails userDetails, @RequestBody UserSettingsRequest request) {
        return ResponseEntity.ok(service.updateSettings(userDetails.getUsername(), request));
    }

    // PATCH /api/settings/text-size
    @PatchMapping("/text-size")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserSettingsResponse> updateTextSize(
            @AuthenticationPrincipal UserDetails userDetails, @RequestParam String size) {
        UserSettingsRequest request = new UserSettingsRequest();
        request.setTextSize(size);
        return ResponseEntity.ok(service.updateSettings(userDetails.getUsername(), request));
    }
}
