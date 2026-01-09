package com.CloudBalance.CloudBalanceBackend.dto;

import com.CloudBalance.CloudBalanceBackend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String roleName;
//    private Date lastLogin;

    // Convert User entity to UserResponseDTO
    public static UserResponseDTO fromEntity(User user) {
        UserResponseDTO dto = new UserResponseDTO();

        dto.setId(String.valueOf(user.getId()));
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
//        dto.setLastLogin(user.getLastLogin());
        dto.setRoleName(user.getRole().getRoleName());

        return dto;
    }
}