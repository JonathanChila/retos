package com.reto03.grupog6.Controllers;

import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @GetMapping("/user")
    public Map<String,Object> user(@AuthenticationPrincipal OAuth2User principal) {
        //return principal.getAttributes(); DONT USE 'CAUSE CYBERSECURITY BREACH
        return Collections.singletonMap("name", principal.getAttribute("name"));
    }
}
