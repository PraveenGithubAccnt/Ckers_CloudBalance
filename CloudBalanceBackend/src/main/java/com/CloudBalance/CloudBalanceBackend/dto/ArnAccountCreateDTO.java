package com.CloudBalance.CloudBalanceBackend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArnAccountCreateDTO {

    @NotBlank(message = "ARN number is required")
    private String arnNumber;

    @NotBlank(message = "Account ID is required")
    private String accountId;

    @NotBlank(message = "Name is required")
    private String name;
}