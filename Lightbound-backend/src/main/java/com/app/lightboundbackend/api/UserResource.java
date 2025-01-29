package com.app.lightboundbackend.api;

import com.app.lightboundbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserResource {
    private final UserService service;
    @Autowired
    public UserResource(UserService service) {
        this.service = service;}
}
