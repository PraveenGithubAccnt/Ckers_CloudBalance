package com.CloudBalance.CloudBalanceBackend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    // Helper method to maintain role
    public void addRole(Role role) {
        this.role=role;
    }

    // Many-to-Many relationship with ArnAccount, owning side
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinTable(
            name = "user_arn_accounts",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "arn_account_id", referencedColumnName = "id")
    )
    private Set<ArnAccount> arnAccounts = new HashSet<>();

    // Helper methods for ArnAccount relationship
    public void addArnAccount(ArnAccount arnAccount) {
        this.arnAccounts.add(arnAccount);
        arnAccount.getUsers().add(this);
    }

    public void removeArnAccount(ArnAccount arnAccount) {
        this.arnAccounts.remove(arnAccount);
        arnAccount.getUsers().remove(this);
    }
}
