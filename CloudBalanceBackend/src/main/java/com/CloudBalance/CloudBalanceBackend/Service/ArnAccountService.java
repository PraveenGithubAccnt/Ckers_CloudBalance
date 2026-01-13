package com.CloudBalance.CloudBalanceBackend.service;

import com.CloudBalance.CloudBalanceBackend.entity.ArnAccount;
import com.CloudBalance.CloudBalanceBackend.repository.ArnAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ArnAccountService {

    @Autowired
    private ArnAccountRepository arnAccountRepository;

    // Get all ARN accounts
    public List<ArnAccount> getAllArnAccounts() {
        return arnAccountRepository.findAll();
    }

    // Get ARN account by ID
    public Optional<ArnAccount> getArnAccountById(Long id) {
        return arnAccountRepository.findById(id);
    }

    // Get ARN account by account ID
    public Optional<ArnAccount> getArnAccountByAccountId(String accountId) {
        return arnAccountRepository.findByAccountId(accountId);
    }

    // Create new ARN account
    public ArnAccount createArnAccount(ArnAccount arnAccount) {
        // Check if ARN number already exists
        if (arnAccountRepository.existsByArnNumber(arnAccount.getArnNumber())) {
            throw new RuntimeException("ARN number already exists: " + arnAccount.getArnNumber());
        }
        // Check if Account ID already exists
        if (arnAccountRepository.existsByAccountId(arnAccount.getAccountId())) {
            throw new RuntimeException("Account ID already exists: " + arnAccount.getAccountId());
        }

        return arnAccountRepository.save(arnAccount);
    }

    // Update ARN account
//    public ArnAccount updateArnAccount(Long id, ArnAccount arnAccountDetails) {
//        ArnAccount arnAccount = arnAccountRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("ARN Account not found with id: " + id));
//
//        arnAccount.setArnNumber(arnAccountDetails.getArnNumber());
//        arnAccount.setAccountId(arnAccountDetails.getAccountId());
//        arnAccount.setName(arnAccountDetails.getName());
//
//        return arnAccountRepository.save(arnAccount);
//    }

    // Delete ARN account
//    public void deleteArnAccount(Long id) {
//        if (!arnAccountRepository.existsById(id)) {
//            throw new RuntimeException("ARN Account not found with id: " + id);
//        }
//        arnAccountRepository.deleteById(id);
//    }

}