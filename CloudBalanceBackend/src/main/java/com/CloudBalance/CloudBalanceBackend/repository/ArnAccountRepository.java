package com.CloudBalance.CloudBalanceBackend.repository;

import com.CloudBalance.CloudBalanceBackend.entity.ArnAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArnAccountRepository extends JpaRepository<ArnAccount,Long>
{
    // Find by ARN number
    Optional<ArnAccount> findByArnNumber(String arnNumber);

    // Find by Account ID
    Optional<ArnAccount> findByAccountId(String accountId);

    // Check if ARN exists
    boolean existsByArnNumber(String arnNumber);

    // Check if Account ID exists
    boolean existsByAccountId(String accountId);

}
