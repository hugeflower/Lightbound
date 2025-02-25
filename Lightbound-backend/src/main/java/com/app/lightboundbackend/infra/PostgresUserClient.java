package com.app.lightboundbackend.infra;

import com.app.lightboundbackend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostgresUserClient extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
