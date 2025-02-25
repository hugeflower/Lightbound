package com.app.lightboundbackend.domain;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository {
    User findByUsername(String username);
    User save(User user);
}
