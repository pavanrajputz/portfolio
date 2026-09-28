package com.pavanrajputz.portfolio.social.controller;

import com.pavanrajputz.portfolio.social.dto.SocialLinkRequest;
import com.pavanrajputz.portfolio.social.dto.SocialLinkResponse;
import com.pavanrajputz.portfolio.social.service.SocialLinkService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/admin/social-links")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class SocialLinkController {

    private final SocialLinkService service;

    @PostMapping
    public SocialLinkResponse createSocialLink(
            @Valid @RequestBody SocialLinkRequest request
    ) {

        return service.createSocialLink(request);
    }

    @GetMapping
    public List<SocialLinkResponse> getAllSocialLinks() {

        return service.getAllSocialLinks();
    }

    @GetMapping("/{id}")
    public SocialLinkResponse getSocialLinkById(
            @PathVariable Long id
    ) {

        return service.getSocialLinkById(id);
    }

    @PutMapping("/{id}")
    public SocialLinkResponse updateSocialLink(
            @PathVariable Long id,
            @Valid @RequestBody SocialLinkRequest request
    ) {

        return service.updateSocialLink(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteSocialLink(
            @PathVariable Long id
    ) {

        service.deleteSocialLink(id);
    }
}
