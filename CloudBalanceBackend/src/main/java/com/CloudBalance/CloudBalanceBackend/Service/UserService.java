package com.CloudBalance.CloudBalanceBackend.Service;

import com.CloudBalance.CloudBalanceBackend.entity.ArnAccount;
import com.CloudBalance.CloudBalanceBackend.entity.Role;
import com.CloudBalance.CloudBalanceBackend.entity.User;
import com.CloudBalance.CloudBalanceBackend.exception.EmailAlreadyExistsException;
import com.CloudBalance.CloudBalanceBackend.exception.ResourceNotFoundException; // ✅ NEW IMPORT
import com.CloudBalance.CloudBalanceBackend.repository.ArnAccountRepository;
import com.CloudBalance.CloudBalanceBackend.repository.RoleRepository;
import com.CloudBalance.CloudBalanceBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ArnAccountRepository arnAccountRepository;

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    //Get user by email needed for /users/me endpoint
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    //Create new user with optional ARN accounts
    @Transactional
    public User createUser(User user, String roleName, List<Long> arnAccountIds) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists: " + user.getEmail());
        }

        Role role = roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName)); // ✅ UPDATED

        user.addRole(role);

        // Encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save user first to get the ID
        User savedUser = userRepository.save(user);

        //Assign ARN accounts if provided
        if (arnAccountIds != null && !arnAccountIds.isEmpty()) {
            assignArnAccountsToUser(savedUser, arnAccountIds);
        }

        return savedUser;
    }

    //Update user with optional ARN accounts
    @Transactional
    public User updateUser(Long id, User userDetails, String roleName, List<Long> arnAccountIds) {

        User user = getUserById(id);

        if (userDetails.getFirstName() != null) {
            user.setFirstName(userDetails.getFirstName());
        }

        if (userDetails.getLastName() != null) {
            user.setLastName(userDetails.getLastName());
        }

        if (userDetails.getEmail() != null) {
            user.setEmail(userDetails.getEmail());
        }

        // Encode password if provided
        if (userDetails.getPassword() != null && !userDetails.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }

        if (roleName != null) {
            Role role = roleRepository.findByRoleName(roleName)
                    .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName)); // ✅ UPDATED
            user.addRole(role);
        }

        //Update ARN accounts if provided
        if (arnAccountIds != null) {
            // Clear existing ARN accounts
            user.getArnAccounts().clear();

            // Assign new ARN accounts (empty list will clear all)
            if (!arnAccountIds.isEmpty()) {
                assignArnAccountsToUser(user, arnAccountIds);
            }
        }

        return userRepository.save(user);
    }

    //UPDATED user
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    //Helper method to assign ARN accounts to user
    private void assignArnAccountsToUser(User user, List<Long> arnAccountIds) {
        List<ArnAccount> arnAccounts = arnAccountRepository.findByIdIn(arnAccountIds);

        if (arnAccounts.size() != arnAccountIds.size()) {
            throw new ResourceNotFoundException("One or more ARN account IDs are invalid"); // ✅ UPDATED
        }

        for (ArnAccount arnAccount : arnAccounts) {
            user.addArnAccount(arnAccount);
        }
    }

    // Backward compatibility
    public User createUser(User user, String roleName) {
        return createUser(user, roleName, null);
    }

    public User updateUser(Long id, User userDetails, String roleName) {
        return updateUser(id, userDetails, roleName, null);
    }
}