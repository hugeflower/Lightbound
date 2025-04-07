package com.app.lightboundbackend.api;

import com.app.lightboundbackend.api.dto.SecretResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

@RestController
@RequestMapping("/secret")
public class SecretResource {

    @GetMapping(value = "/user")
    public ResponseEntity<SecretResponse> getUserSecret() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String sanitizedUsername = HtmlUtils.htmlEscape(authentication.getName());
        SecretResponse secretResponse = new SecretResponse(sanitizedUsername,
            "Vous pouvez accéder à ce secret réservé à n'importe " +
            "quel utilisateur avec un cookie valide");
        return ResponseEntity.ok()
            .header("Cache-Control", "no-store")
            .body(secretResponse);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/admin")
    public ResponseEntity<SecretResponse> getAdminSecret() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String sanitizedUsername = HtmlUtils.htmlEscape(authentication.getName());
        SecretResponse secretResponse = new SecretResponse(sanitizedUsername,
            "Ouh làlà, vous venez d'accéder à un secret réservé aux " +
                "admins avec un cookie valide");
        return ResponseEntity.ok()
            .header("Cache-Control", "no-store")
            .body(secretResponse);
    }
}
