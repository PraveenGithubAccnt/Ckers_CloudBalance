package com.CloudBalance.CloudBalanceBackend.dto;

import com.CloudBalance.CloudBalanceBackend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {


    private String firstName;
    private String lastName;
    private String email;
    private String roleName;
    private List<ArnAccountInfo> arnAccounts;

    // Convert User entity to UserResponseDTO
    public static UserResponseDTO fromEntity(User user) {
        UserResponseDTO dto = new UserResponseDTO();

        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRoleName(user.getRole().getRoleName());

        // Extract name and accountId from ArnAccount objects
        dto.setArnAccounts(
                user.getArnAccounts().stream()
                        .map(arnAccount -> new ArnAccountInfo(
                                arnAccount.getName(),
                                arnAccount.getAccountId()
                        ))
                        .collect(Collectors.toList())
        );

        return dto;
    }

    // Nested class for ARN account info
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ArnAccountInfo {
        private String name;
        private String accountId;
    }
}