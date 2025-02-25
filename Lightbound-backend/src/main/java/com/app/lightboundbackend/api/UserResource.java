package com.app.lightboundbackend.api;

import com.app.lightboundbackend.application.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/auth")
public class UserResource {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/register")
    public String register(@RequestBody RegistrationRequest registrationRequest) {
        userService.registerUser(registrationRequest.username(), registrationRequest.password());
        return "User registered successfully!";
    }

}
