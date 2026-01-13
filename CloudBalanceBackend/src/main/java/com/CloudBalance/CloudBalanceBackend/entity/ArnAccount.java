package com.CloudBalance.CloudBalanceBackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "arn_accounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArnAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "arn_number", unique = true, nullable = false, length = 500)
    private String arnNumber;

    @Column(name = "account_id", unique = true, nullable = false, length = 50)
    private String accountId;

    @Column(name = "name", nullable = false, length = 200)
    private String name;


    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    @ManyToMany(mappedBy = "arnAccounts", fetch = FetchType.LAZY)
    @JsonIgnore  // prevent infinite loop in JSON serialization
    private Set<User> users = new HashSet<>();
}