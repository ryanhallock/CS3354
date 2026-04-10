package edu.utdallas.cs3354.whatt.service;

import edu.utdallas.cs3354.whatt.security.JwtService;
import edu.utdallas.cs3354.whatt.security.Role;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private static final String JWT_COOKIE_NAME = "jwt";
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    @Value("${jwt.cookie.secure}")
    private boolean cookieSecure;

    public AuthService(UserService userService, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public void register(String username, String password) {
        userService.createUser(username, password, Role.USER);
    }

    public ResponseCookie login(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        final String token = jwtService.generateToken(username);
        return buildJwtCookie(token, jwtExpiration);
    }

    public ResponseCookie logout(String username) {
        return buildJwtCookie("", 0);
    }

    public ResponseCookie refreshToken(String username) {
        return buildJwtCookie(jwtService.generateToken(username), jwtExpiration);
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
