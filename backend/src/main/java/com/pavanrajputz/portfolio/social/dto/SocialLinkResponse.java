package com.pavanrajputz.portfolio.social.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocialLinkResponse {

    private Long id;
    private String platform;
    private String url;
    private String username;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
