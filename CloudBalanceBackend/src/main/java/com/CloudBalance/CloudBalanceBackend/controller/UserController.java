package com.CloudBalance.CloudBalanceBackend.controller;
import com.CloudBalance.CloudBalanceBackend.dto.UserCreateDTO;
import com.CloudBalance.CloudBalanceBackend.dto.UserResponseDTO;
import com.CloudBalance.CloudBalanceBackend.dto.UserUpdateDTO;
import com.CloudBalance.CloudBalanceBackend.entity.User;
import com.CloudBalance.CloudBalanceBackend.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    //Get Health
    @GetMapping(path = "health")
    public String healthWeb()
    {
        return "Server is running ";
    }

    // Get all users
    @PreAuthorize("hasAnyRole('ADMIN', 'READ_ONLY')")
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {

        List<UserResponseDTO> response = userService.getAllUsers()
                .stream()
                .map(UserResponseDTO::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    // Get user by ID
    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER')")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {

        User user = userService.getUserById(id);
        return ResponseEntity.ok(UserResponseDTO.fromEntity(user));
    }

    // Delete user
    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {

        userService.deleteUser(email);
        return ResponseEntity.noContent().build();
    }

    // Create new user
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(
            @Valid @RequestBody UserCreateDTO createDTO) {

        User user = new User();
        user.setFirstName(createDTO.getFirstName());
        user.setLastName(createDTO.getLastName());
        user.setEmail(createDTO.getEmail());
        user.setPassword(createDTO.getPassword());

        //arnAccountIds
        User savedUser = userService.createUser(
                user,
                createDTO.getRoleName(),
                createDTO.getArnAccountIds()
        );

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(UserResponseDTO.fromEntity(savedUser));
    }
    // Update user
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{email}")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable String email,
            @RequestBody UserUpdateDTO updateDTO) {

        User userDetails = new User();

        userDetails.setFirstName(updateDTO.getFirstName());
        userDetails.setLastName(updateDTO.getLastName());
        userDetails.setEmail(updateDTO.getEmail());

        if (updateDTO.getPassword() != null && !updateDTO.getPassword().isBlank()) {
            userDetails.setPassword(updateDTO.getPassword());
        }

        //arnAccountIds
        User updatedUser = userService.updateUser(
                email,
                userDetails,
                updateDTO.getRoleName(),
                updateDTO.getArnAccountIds()
        );

        return ResponseEntity.ok(UserResponseDTO.fromEntity(updatedUser));
    }

}
