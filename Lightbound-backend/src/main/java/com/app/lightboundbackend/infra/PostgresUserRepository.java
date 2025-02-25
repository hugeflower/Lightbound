package com.app.lightboundbackend.infra;

import com.app.lightboundbackend.domain.User;
import com.app.lightboundbackend.domain.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PostgresUserRepository implements UserRepository {
    private final PostgresUserClient client;

    @Autowired
    public PostgresUserRepository(PostgresUserClient postgresUserClient) {
        this.client = postgresUserClient;
    }

    @Override
    public User findByUsername(String username) {
        return client.findByUsername(username);
    }

    @Override
    public User save(User user) {
        return client.save(user);
    }
}
