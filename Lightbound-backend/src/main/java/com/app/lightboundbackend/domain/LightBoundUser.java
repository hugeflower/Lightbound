package com.app.lightboundbackend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class LightBoundUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private UserRoles userRoles;

    public LightBoundUser(String username, String password, boolean admin) {
        this.username = username;
        this.password = password;
        this.userRoles = admin ? UserRoles.ADMIN : UserRoles.USER;
    }

    public LightBoundUser() {

    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String encodedPassword) {
        this.password = encodedPassword;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public UserRoles getUserRoles() {
        return userRoles;
    }
}
