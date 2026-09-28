package com.pavanrajputz.portfolio.social.controller;

import com.pavanrajputz.portfolio.social.dto.SocialLinkResponse;
import com.pavanrajputz.portfolio.social.service.SocialLinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/social-links")
@RequiredArgsConstructor
public class PublicSocialLinkController {

    private final SocialLinkService socialService;

    @GetMapping
    public ResponseEntity<List<SocialLinkResponse>> getAllSocialLinks() {
        return ResponseEntity.ok(socialService.getAllSocialLinks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SocialLinkResponse> getSocialLinkById(@PathVariable Long id) {
        return ResponseEntity.ok(socialService.getSocialLinkById(id));
    }
}
