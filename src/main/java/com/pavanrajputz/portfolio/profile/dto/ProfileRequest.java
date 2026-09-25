package com.pavanrajputz.portfolio.profile.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileRequest {

    @NotBlank(message = "Name cannot be blank")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

    @Size(max = 150, message = "Headline cannot exceed 150 characters")
    private String headline;

    @Size(max = 5000, message = "Bio cannot exceed 5000 characters")
    private String bio;

    @Size(max = 500, message = "Profile image URL cannot exceed 500 characters")
    private String profileImageUrl;

    @Email(message = "Email must be valid")
    @Size(max = 150, message = "Email cannot exceed 150 characters")
    private String email;

    @Size(max = 20, message = "Phone cannot exceed 20 characters")
    private String phone;

    @Size(max = 150, message = "Location cannot exceed 150 characters")
    private String location;

    @Size(max = 500, message = "Resume URL cannot exceed 500 characters")
    private String resumeUrl;

}
