package com.CloudBalance.CloudBalanceBackend.dto;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDTO {

    private String firstName;

    private String lastName;

    @Email(message = "Email must be valid")
    private String email;

    private String password;

    private String roleName;

    private List<Long> arnAccountIds;
}