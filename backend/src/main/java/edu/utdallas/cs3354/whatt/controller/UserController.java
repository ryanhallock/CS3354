package edu.utdallas.cs3354.whatt.controller;

import edu.utdallas.cs3354.whatt.dto.request.UpdatePasswordRequest;
import edu.utdallas.cs3354.whatt.dto.request.UpdateUsernameRequest;
import edu.utdallas.cs3354.whatt.dto.response.UserResponse;
import edu.utdallas.cs3354.whatt.entity.User;
import edu.utdallas.cs3354.whatt.service.FlashcardSetService;
import edu.utdallas.cs3354.whatt.service.UserService;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/user")
@PreAuthorize("isAuthenticated()")
public class UserController {
    private final UserService userService;
    private final FlashcardSetService flashcardSetService;

    @Autowired
    public UserController(UserService userService, FlashcardSetService flashcardSetService) {
        this.userService = userService;
        this.flashcardSetService = flashcardSetService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getUserProfile(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.getUserByUsername(userDetails.getUsername());
        return ResponseEntity.ok(new UserResponse(user.getUsername(), user.getCreatedAt()));
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserResponse> getPublicUserProfile(
            @AuthenticationPrincipal UserDetails currentUser, @PathVariable String username) {
        User user = userService.getUserByUsername(username);

        if (currentUser != null && currentUser.getUsername().equals(username)) {
            return ResponseEntity.ok(new UserResponse(user.getUsername(), user.getCreatedAt()));
        }

        boolean isViewerAdmin = currentUser != null
                && currentUser.getAuthorities().stream()
                        .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (isViewerAdmin) {
            return ResponseEntity.ok(new UserResponse(user.getUsername(), user.getCreatedAt()));
        }

        if (!flashcardSetService.hasPublicSets(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "This profile is private");
        }
        return ResponseEntity.ok(new UserResponse(user.getUsername(), user.getCreatedAt()));
    }

    @PutMapping("/username")
    public ResponseEntity<Map<String, String>> updateUsername(
            @AuthenticationPrincipal UserDetails userDetails, @Valid @RequestBody UpdateUsernameRequest request) {
        try {
            userService.updateUsername(userDetails.getUsername(), request.newUsername());
            return ResponseEntity.ok(Map.of("message", "Username updated successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/password")
    public ResponseEntity<Map<String, String>> updatePassword(
            @AuthenticationPrincipal UserDetails userDetails, @Valid @RequestBody UpdatePasswordRequest request) {
        try {
            userService.updatePassword(userDetails.getUsername(), request.currentPassword(), request.newPassword());
            return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
}
