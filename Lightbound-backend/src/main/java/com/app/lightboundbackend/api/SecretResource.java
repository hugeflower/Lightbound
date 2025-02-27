package com.app.lightboundbackend.api;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/secret")
public class SecretResource {

    @GetMapping(value = "/user")
    public String getUserSecret() {
        return "Vous pouvez accéder à ce secret réservé à n'importe quel utilisateur avec un cookie valide";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/admin")
    public String getAdminSecret() {
        return "Ouh làlà, vous venez d'accéder à un secret réservé aux admins avec un cookie valide";
    }
}
