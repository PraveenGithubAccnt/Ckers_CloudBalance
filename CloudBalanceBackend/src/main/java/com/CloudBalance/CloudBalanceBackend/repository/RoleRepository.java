package com.CloudBalance.CloudBalanceBackend.repository;

import com.CloudBalance.CloudBalanceBackend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    // Custom method finds role by name
    Optional<Role> findByRoleName(String roleName);

    // Check if role exists
    boolean existsByRoleName(String roleName);
}