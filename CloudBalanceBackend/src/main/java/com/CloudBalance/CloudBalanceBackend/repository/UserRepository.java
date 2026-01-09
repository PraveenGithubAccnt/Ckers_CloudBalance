package com.CloudBalance.CloudBalanceBackend.repository;
import com.CloudBalance.CloudBalanceBackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Custom method Spring generates JPQL
    Optional<User> findByEmail(String email);

    // Check if email exists
    boolean existsByEmail(String email);
}