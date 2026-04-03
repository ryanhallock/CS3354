package edu.utdallas.cs3354.whatt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> test(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(Map.of("message", "You are authenticated as " + userDetails.getUsername()));
    }
}
