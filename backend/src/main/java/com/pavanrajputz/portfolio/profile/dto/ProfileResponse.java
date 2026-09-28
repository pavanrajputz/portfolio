package com.pavanrajputz.portfolio.profile.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse {
    private Long id;
    private String name;
    private String headline;
    private String bio;
    private String profileImageUrl;
    private String email;
    private String phone;
    private String location;
    private String resumeUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
