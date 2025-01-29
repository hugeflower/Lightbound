package com.app.lightboundbackend.infrastructure;

import com.app.lightboundbackend.domain.user.UserRepository;
import org.springframework.stereotype.Repository;

@Repository
public class InMemoryUserRepository implements UserRepository {
}
