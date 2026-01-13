package com.CloudBalance.CloudBalanceBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserProfileDTO
{

        private String firstName;
        private String lastName;
        private String role;
        private Long UserId;


}
