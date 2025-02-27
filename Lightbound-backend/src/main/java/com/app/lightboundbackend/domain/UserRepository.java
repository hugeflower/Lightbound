package com.app.lightboundbackend.domain;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository {
    LightBoundUser findByUsername(String username);
    LightBoundUser save(LightBoundUser lightBoundUser);
}
