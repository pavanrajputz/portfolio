package com.pavanrajputz.portfolio.auth.controller;


import com.pavanrajputz.portfolio.auth.dto.LoginRequest;
import com.pavanrajputz.portfolio.auth.dto.LoginResponse;
import com.pavanrajputz.portfolio.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest loginRequest){
        return authService.login(loginRequest);
    }
}
