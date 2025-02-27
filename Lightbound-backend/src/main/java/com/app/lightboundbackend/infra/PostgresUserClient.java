package com.app.lightboundbackend.infra;

import com.app.lightboundbackend.domain.LightBoundUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostgresUserClient extends JpaRepository<LightBoundUser, Long> {
    LightBoundUser findByUsername(String username);
}
