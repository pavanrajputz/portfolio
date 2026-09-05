package com.pavanrajputz.portfolio.auth.controller;


import com.pavanrajputz.portfolio.auth.dto.LoginRequest;
import com.pavanrajputz.portfolio.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public String login(@Valid @RequestBody LoginRequest loginRequest){
        authService.authenticate(loginRequest);
        return "Login Successful";
    }
}
