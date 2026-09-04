package com.pavanrajputz.portfolio.config;

import com.pavanrajputz.portfolio.entities.Admin;
import com.pavanrajputz.portfolio.entities.Role;
import com.pavanrajputz.portfolio.repositories.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${ADMIN_EMAIL}")
    private String adminEmail;

    @Value("${ADMIN_PASSWORD}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {

        if (adminRepository.findByEmail(adminEmail).isEmpty()) {

            Admin admin = new Admin();

            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRole(Role.ADMIN);

            adminRepository.save(admin);

            System.out.println("Initial admin created successfully.");
        }
    }
}
