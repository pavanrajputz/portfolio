package com.pavanrajputz.portfolio.auth.service;

import com.pavanrajputz.portfolio.auth.dto.LoginRequest;
import com.pavanrajputz.portfolio.auth.dto.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authManager;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request){
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        UserDetails user = (UserDetails) auth.getPrincipal();

        assert user != null;
        String token = jwtService.generateToken(user);

        return LoginResponse.builder()
                .accessToken(token)
                .build();

    }

}
