package edu.utdallas.cs3354.whatt.security;

import edu.utdallas.cs3354.whatt.service.DatabaseUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private static final String JWT_COOKIE_NAME = "jwt";

    private final JwtService jwtService;
    private final DatabaseUserDetailsService userDetailsService;
    private final WebAuthenticationDetailsSource authDetailsSource = new WebAuthenticationDetailsSource();

    public JwtAuthFilter(JwtService jwtService, DatabaseUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                Cookie[] cookies = request.getCookies();
                if (cookies != null) {
                    for (Cookie cookie : cookies) {
                        if (JWT_COOKIE_NAME.equals(cookie.getName())) {
                            String username = jwtService.extractUsername(cookie.getValue());
                            if (username != null) {
                                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                                        userDetails, null, userDetails.getAuthorities());
                                auth.setDetails(authDetailsSource.buildDetails(request));
                                SecurityContextHolder.getContext().setAuthentication(auth);
                            }
                            break;
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Error during JWT authentication: " + e.getMessage());
        }
        filterChain.doFilter(request, response);
    }
}
