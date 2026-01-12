package com.CloudBalance.CloudBalanceBackend.dto;

import com.CloudBalance.CloudBalanceBackend.entity.ArnAccount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArnAccountResponseDTO {

    private String id;
    private String arnNumber;
    private String accountId;
    private String name;

    // Convert ArnAccount entity to DTO
    public static ArnAccountResponseDTO fromEntity(ArnAccount arnAccount) {
        ArnAccountResponseDTO dto = new ArnAccountResponseDTO();
        dto.setId(String.valueOf(arnAccount.getId()));
        dto.setArnNumber(arnAccount.getArnNumber());
        dto.setAccountId(arnAccount.getAccountId());
        dto.setName(arnAccount.getName());
        return dto;
    }
}