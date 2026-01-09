package com.CloudBalance.CloudBalanceBackend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // Read Authorization header
        String authHeader = request.getHeader("Authorization");

        // Check if header exists and starts with "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract token
        String token = authHeader.substring(7);

        // validate token
        if (!jwtUtil.isTokenValid(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract data from token
        String email = jwtUtil.extractEmail(token);
        String role = jwtUtil.extractRole(token);

        // Create Authentication object
        String normalizedRole = role
                .trim()
                .toUpperCase()
                .replace(" ", "_");

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        List.of(new SimpleGrantedAuthority("ROLE_" + normalizedRole))
                );

//        System.out.println("ROLE FROM TOKEN = " + role);
//        System.out.println("GRANTED AUTHORITY = ROLE_" + normalizedRole);
//        System.out.println("Authorities = " + authentication.getAuthorities());



        // set authentication in security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // continue filter chain
        filterChain.doFilter(request, response);
    }
}
