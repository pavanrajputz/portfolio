package com.pavanrajputz.portfolio.profile.service;

import com.pavanrajputz.portfolio.exception.ResourceNotFound;
import com.pavanrajputz.portfolio.profile.dto.ProfileRequest;
import com.pavanrajputz.portfolio.profile.dto.ProfileResponse;
import com.pavanrajputz.portfolio.profile.entity.Profile;
import com.pavanrajputz.portfolio.profile.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository repo;


    public ProfileResponse getProfile(){
        Profile profile = repo.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() ->
                        new ResourceNotFound("Profile not found")
                );

        return mapToResponse(profile);

    }


    public ProfileResponse updateProfile(
            ProfileRequest request
    ){
        Profile profile = repo.findAll()
                .stream()
                .findFirst()
                .orElseGet(Profile::new);


        profile.setName(request.getName());
        profile.setBio(request.getBio());
        profile.setProfileImageUrl(request.getProfileImageUrl());
        profile.setLocation(request.getLocation());
        profile.setResumeUrl(request.getResumeUrl());
        profile.setEmail(request.getEmail());
        profile.setPhone(request.getPhone());
        profile.setHeadline(request.getHeadline());

        Profile saved = repo.save(profile);

        return mapToResponse(saved);
    }

    private ProfileResponse mapToResponse(Profile profile) {

        return ProfileResponse.builder()
                .id(profile.getId())
                .name(profile.getName())
                .headline(profile.getHeadline())
                .bio(profile.getBio())
                .profileImageUrl(profile.getProfileImageUrl())
                .email(profile.getEmail())
                .phone(profile.getPhone())
                .location(profile.getLocation())
                .resumeUrl(profile.getResumeUrl())
                .createdAt(profile.getCreatedAt())
                .updatedAt(profile.getUpdatedAt())
                .build();
    }
}
