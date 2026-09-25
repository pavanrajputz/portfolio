package com.pavanrajputz.portfolio.social.service;

import com.pavanrajputz.portfolio.exception.ResourceNotFound;
import com.pavanrajputz.portfolio.social.dto.SocialLinkRequest;
import com.pavanrajputz.portfolio.social.dto.SocialLinkResponse;
import com.pavanrajputz.portfolio.social.entity.SocialLink;
import com.pavanrajputz.portfolio.social.repository.SocialLinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SocialLinkService {
    private final SocialLinkRepository repo;

    public SocialLinkResponse createSocialLink(
            SocialLinkRequest request
    ){
        SocialLink social = SocialLink
                .builder()
                .platform(request.getPlatform())
                .url(request.getUrl())
                .username(request.getUsername())
                .build();

        SocialLink saved = repo.save(social);

        return mapToResponse(saved);
    }

    public List<SocialLinkResponse> getAllSocialLinks() {

        return repo.findAllByIsDeletedIsFalse()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public SocialLinkResponse getSocialLinkById(Long id) {

        SocialLink socialLink = repo
                .findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "Social link not found with id " + id
                        )
                );

        return mapToResponse(socialLink);
    }

    public SocialLinkResponse updateSocialLink(
            Long id,
            SocialLinkRequest request
    ) {

        SocialLink socialLink = repo
                .findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "Social link not found with id " + id
                        )
                );

        socialLink.setPlatform(request.getPlatform());
        socialLink.setUrl(request.getUrl());
        socialLink.setUsername(request.getUsername());

        SocialLink updated = repo.save(socialLink);

        return mapToResponse(updated);
    }

    public void deleteSocialLink(Long id) {

        SocialLink socialLink = repo
                .findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "Social link not found with id " + id
                        )
                );

        socialLink.setIsDeleted(true);

        repo.save(socialLink);
    }

    private SocialLinkResponse mapToResponse(
            SocialLink socialLink
    ) {

        return SocialLinkResponse.builder()
                .id(socialLink.getId())
                .platform(socialLink.getPlatform())
                .url(socialLink.getUrl())
                .username(socialLink.getUsername())
                .createdAt(socialLink.getCreatedAt())
                .updatedAt(socialLink.getUpdatedAt())
                .build();
    }

}
