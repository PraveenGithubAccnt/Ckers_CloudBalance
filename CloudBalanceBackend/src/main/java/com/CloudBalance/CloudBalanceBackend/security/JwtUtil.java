package com.CloudBalance.CloudBalanceBackend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    // Token expires after 15 minutes
    private static final long EXPIRATION_TIME = 15 * 60 * 1000;

//    private static final long EXPIRATION_TIME = 2 * 60 * 1000;

    // Secret key
    private static final String SECRET = "cloudbalance-secret-key-should-be-very-secure-34xsw13-67ghjq2-67unt4es2";

    // Generate secret key from string
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    // Generate JWT token
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .subject(email)                               // Email as subject
                .claim("role", role)                    // Custom claim role
                .issuedAt(new Date())                         // Created now
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))  // Expires in 15 min
                .signWith(key)                                // Sign with secret key
                .compact();                                   // Build token string
    }

    // Validate token
    public boolean isTokenValid(String token) {
        try {
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Extract email from token
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Extract role from token
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }


    // Extract all claims (data) from token
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Check if token is expired
    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
}