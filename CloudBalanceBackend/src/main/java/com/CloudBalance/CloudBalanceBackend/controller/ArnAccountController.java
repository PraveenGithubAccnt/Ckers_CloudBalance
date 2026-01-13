package com.CloudBalance.CloudBalanceBackend.controller;
import com.CloudBalance.CloudBalanceBackend.dto.ArnAccountCreateDTO;
import com.CloudBalance.CloudBalanceBackend.dto.ArnAccountResponseDTO;
import com.CloudBalance.CloudBalanceBackend.entity.ArnAccount;
import com.CloudBalance.CloudBalanceBackend.service.ArnAccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/arnaccounts")
public class ArnAccountController {

    @Autowired
    private ArnAccountService arnAccountService;

    //Get all ARN accounts
    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<ArnAccountResponseDTO>> getAllArnAccounts() {
        List<ArnAccount> arnAccounts = arnAccountService.getAllArnAccounts();

        List<ArnAccountResponseDTO> response = arnAccounts.stream()
                .map(ArnAccountResponseDTO::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }



    //Create new ARN account
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ArnAccountResponseDTO> createArnAccount(
            @Valid @RequestBody ArnAccountCreateDTO createDTO) {

        ArnAccount arnAccount = new ArnAccount();
        arnAccount.setArnNumber(createDTO.getArnNumber());
        arnAccount.setAccountId(createDTO.getAccountId());
        arnAccount.setName(createDTO.getName());

        ArnAccount savedArnAccount = arnAccountService.createArnAccount(arnAccount);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ArnAccountResponseDTO.fromEntity(savedArnAccount));  // Fixed
    }


    //Get ARN account by ID
//    @PreAuthorize("hasAnyRole('ADMIN')")
//    @GetMapping("/{id}")
//    public ResponseEntity<ArnAccountResponseDTO> getArnAccountById(@PathVariable Long id) {
//        ArnAccount arnAccount = arnAccountService.getArnAccountById(id)
//                .orElseThrow(() -> new RuntimeException("ARN Account not found with id: " + id));
//
//        return ResponseEntity.ok(ArnAccountResponseDTO.fromEntity(arnAccount));
//    }
//
    }
