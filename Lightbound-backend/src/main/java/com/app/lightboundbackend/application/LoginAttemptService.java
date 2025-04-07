package com.app.lightboundbackend.application;

import org.springframework.stereotype.Service;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Service
public class LoginAttemptService {
    private final int MAX_ATTEMPTS = 3;
    private final long LOCK_TIME = 60; // Minutes
    private final ConcurrentHashMap<String, Integer> attemptsCache = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Long> lockTimeCache = new ConcurrentHashMap<>();

    public void loginFailed(String username) {
        if (isLocked(username)) return;

        int attempts = attemptsCache.getOrDefault(username, 0) + 1;
        attemptsCache.put(username, attempts);

        if (attempts >= MAX_ATTEMPTS) {
            lockTimeCache.put(username, System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(LOCK_TIME));
        }
    }

    public boolean isLocked(String username) {
        Long lockTime = lockTimeCache.get(username);
        if (lockTime == null) return false;

        if (lockTime > System.currentTimeMillis()) {
            return true;
        } else {
            lockTimeCache.remove(username);
            attemptsCache.remove(username);
            return false;
        }
    }
}
