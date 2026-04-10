package edu.utdallas.cs3354.whatt.service;

import edu.utdallas.cs3354.whatt.entity.User;
import edu.utdallas.cs3354.whatt.repository.UserRepository;
import edu.utdallas.cs3354.whatt.security.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(String username, String rawPassword, Role role) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        // While all admins are users, Spring doesn't think that way, so we need to grant Admin both roles
        String encodedPassword = passwordEncoder.encode(rawPassword);
        var user = new User(username, encodedPassword, role == Role.ADMIN ? Set.of(Role.ADMIN, Role.USER) : Set.of(Role.USER));
        userRepository.save(user);
        return user;
    }
}
