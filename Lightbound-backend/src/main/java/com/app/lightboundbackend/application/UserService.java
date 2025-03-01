package com.app.lightboundbackend.application;

import com.app.lightboundbackend.domain.LightBoundUser;
import com.app.lightboundbackend.domain.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private static final String REGEX_PASSWORD =
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*\\d).{12,}$";

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LightBoundUser lightBoundUser = userRepository.findByUsername(username);
        if (lightBoundUser == null) {
            throw new UsernameNotFoundException("Utilisateur non trouvé: " + username);
        }
        List<GrantedAuthority> authorities = Collections.singletonList(
            new SimpleGrantedAuthority("ROLE_" + lightBoundUser.getUserRoles())
        );
        return new User(
            lightBoundUser.getUsername(),
            lightBoundUser.getPassword(),
            authorities
        );
    }

    public void registerUser(String username, String password, boolean admin) throws Exception {
        LightBoundUser lightBoundUser;
        validateNewUser(username, password);
        lightBoundUser = new LightBoundUser(username, passwordEncoder.encode(password), admin);
        userRepository.save(lightBoundUser);
    }

    private void validateNewUser(String username, String password) throws Exception {
        if (userRepository.findByUsername(username) != null) {
            throw new Exception("Problème non spécifié");
        }
        Matcher matcher = Pattern.compile(REGEX_PASSWORD).matcher(password);
        if (!matcher.matches()) throw new Exception(
            "Mot de passe invalide, vous devez respecter ces règles : une minuscule, une majuscule, un caractère spécial et minimum 12 caractères en tout.");
        if (password.contains(username)) throw new Exception("Votre mot de passe ne peut pas contenir votre nom d'utilisateur");
    }
}
