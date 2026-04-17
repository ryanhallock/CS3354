package edu.utdallas.cs3354.whatt.controller;

import edu.utdallas.cs3354.whatt.dto.UpdatePasswordRequest;
import edu.utdallas.cs3354.whatt.dto.UpdateUsernameRequest;
import edu.utdallas.cs3354.whatt.service.UserService;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@PreAuthorize("isAuthenticated()")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/username")
    public ResponseEntity<Map<String, String>> updateUsername(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody UpdateUsernameRequest request) {
        try {
            userService.updateUsername(userDetails.getUsername(), request.newUsername());
            return ResponseEntity.ok(Map.of("message", "Username updated successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/password")
    public ResponseEntity<Map<String, String>> updatePassword(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody UpdatePasswordRequest request) {
        try {
            userService.updatePassword(userDetails.getUsername(), request.currentPassword(), request.newPassword());
            return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
}
