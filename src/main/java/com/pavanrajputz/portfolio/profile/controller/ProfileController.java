package com.pavanrajputz.portfolio.profile.controller;

import com.pavanrajputz.portfolio.profile.dto.ProfileRequest;
import com.pavanrajputz.portfolio.profile.dto.ProfileResponse;
import com.pavanrajputz.portfolio.profile.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/profile")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class ProfileController {

    private final ProfileService service;

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile() {

        return ResponseEntity
                .ok(
                        service.getProfile()
                );

    }

    @PutMapping
    public ResponseEntity<ProfileResponse> updateProfile(
            @Valid @RequestBody ProfileRequest request
    ) {

        return ResponseEntity
                .ok(
                        service.updateProfile(request)
                );
    }
}
