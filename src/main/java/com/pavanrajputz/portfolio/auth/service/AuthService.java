package com.pavanrajputz.portfolio.auth.service;

import com.pavanrajputz.portfolio.auth.dto.LoginRequest;
import com.pavanrajputz.portfolio.entities.Admin;
import com.pavanrajputz.portfolio.repositories.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private AdminRepository adminRepository;
    private PasswordEncoder passwordEncoder;

    public Admin authenticate(LoginRequest request){
        Admin admin = adminRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(request.getPassword(), admin.getPassword())){
            throw new RuntimeException("Invalid credentials");
        }

        return admin;
    }
}
