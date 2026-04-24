package edu.utdallas.cs3354.whatt.controller;

import edu.utdallas.cs3354.whatt.dto.request.UserSettingsRequest;
import edu.utdallas.cs3354.whatt.dto.response.UserSettingsResponse;
import edu.utdallas.cs3354.whatt.service.UserSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
public class UserSettingsController {

    private final UserSettingsService service;

    @Autowired
    public UserSettingsController(UserSettingsService service) {
        this.service = service;
    }

    // GET /api/settings/{userId}
    @GetMapping("/{userId}")
    public ResponseEntity<UserSettingsResponse> getSettings(@PathVariable String userId) {
        return ResponseEntity.ok(service.getSettings(userId));
    }

    // PUT /api/settings/{userId}
    @PutMapping("/{userId}")
    public ResponseEntity<UserSettingsResponse> updateSettings(
            @PathVariable String userId,
            @RequestBody UserSettingsRequest request) {
        return ResponseEntity.ok(service.updateSettings(userId, request));
    }

    // PATCH /api/settings/{userId}/text-size
    @PatchMapping("/{userId}/text-size")
    public ResponseEntity<UserSettingsResponse> updateTextSize(
            @PathVariable String userId,
            @RequestParam String size) {
        UserSettingsRequest request = new UserSettingsRequest();
        request.setTextSize(size);
        return ResponseEntity.ok(service.updateSettings(userId, request));
    }
}