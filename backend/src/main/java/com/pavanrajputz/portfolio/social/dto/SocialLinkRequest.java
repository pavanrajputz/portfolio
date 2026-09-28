package com.pavanrajputz.portfolio.social.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocialLinkRequest {

    @NotBlank(message = "Platform cannot be blank")
    @Size(max = 50, message = "Platform cannot exceed 50 characters")
    private String platform;

    @NotBlank(message = "URL cannot be blank")
    @Size(max = 500, message = "URL cannot exceed 500 characters")
    private String url;

    @Size(max = 100, message = "Username cannot exceed 100 characters")
    private String username;
}
