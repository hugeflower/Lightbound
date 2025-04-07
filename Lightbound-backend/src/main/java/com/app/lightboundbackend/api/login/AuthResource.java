package com.app.lightboundbackend.api.login;

import com.app.lightboundbackend.api.RegistrationRequest;
import com.app.lightboundbackend.application.LoginAttemptService;
import com.app.lightboundbackend.application.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/auth")
public class AuthResource {

    @Autowired
    private UserService userService;
    @Autowired
    private LoginAttemptService loginAttemptService;
    @Autowired
    private AuthenticationManager authenticationManager;

    private final long expirationTime = 15 * 60 * 1000; // 1 minute
    private final String secretKey;
    private final String allowedDomain;

    public AuthResource(@Value("${jwt.secret-key}") String secretKey, @Value("${ALLOWED_DOMAIN:}") String allowedDomain) {
        this.secretKey = secretKey;
        this.allowedDomain = allowedDomain;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<String> register(@RequestBody RegistrationRequest registrationRequest) {
        try {
            userService.registerUser(registrationRequest.username(), registrationRequest.password(), registrationRequest.admin());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur à la création. " + e.getMessage());
        }

        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            if (loginAttemptService.isLocked(loginRequest.getUsername())) {
                return ResponseEntity.status(429).body("Trop d'essais ratés! Le compte est bloqué");
            }
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );
            String token = createJWT(authentication);
            ResponseCookie jwtCookie = createCookie(token);
            return ResponseEntity.ok()
                .header("Set-Cookie", jwtCookie.toString()).body(token);
        } catch (Exception e) {
            loginAttemptService.loginFailed(loginRequest.getUsername());
            return ResponseEntity.status(500).body("Erreur de login. " + e.getMessage());
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(401).body("No user logged in!");
        }
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        Cookie jwtCookie = new Cookie("jwt", null);
        jwtCookie.setMaxAge(0); // Expire immédiatement
        jwtCookie.setPath("/"); // Même chemin que lors de la création du cookie
        response.addCookie(jwtCookie);

        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Successfully logged out!");
    }

    private ResponseCookie createCookie(String token) {
        return ResponseCookie.from("jwt", token)
            .httpOnly(true)
            .secure(true)
            .path("/")
            .sameSite("None")
            .domain(allowedDomain)
            .maxAge((int) (expirationTime/1000))
            .build();
    }

    private String createJWT(Authentication authentication) {
        String token = Jwts.builder()
            .subject(authentication.getName())
            .claim("roles", authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()))
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + expirationTime))
            .signWith(Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)))
            .compact();
        return token;
    }

}
