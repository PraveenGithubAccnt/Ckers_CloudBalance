package com.CloudBalance.CloudBalanceBackend.controller;

import com.CloudBalance.CloudBalanceBackend.dto.LoginRequestDTO;
import com.CloudBalance.CloudBalanceBackend.dto.LoginResponseDTO;
import com.CloudBalance.CloudBalanceBackend.entity.User;
import com.CloudBalance.CloudBalanceBackend.repository.UserRepository;
import com.CloudBalance.CloudBalanceBackend.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil,
                          UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().getRoleName()
        );

        long expiresIn = 15 * 60; // 15 minutes

        return new LoginResponseDTO(
                token,
                user.getRole().getRoleName(),
                user.getFirstName(),
                user.getLastName(),
                expiresIn
        );
    }

}
