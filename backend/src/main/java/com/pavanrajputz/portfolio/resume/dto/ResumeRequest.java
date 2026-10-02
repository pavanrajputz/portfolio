package com.pavanrajputz.portfolio.resume.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeRequest {

    @NotBlank(message = "Title cannot be blank")
    @Size(max = 200, message = "Title cannot exceed 200 characters")
    private String title;

    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    private String description;

    @NotBlank(message = "File URL cannot be blank")
    @Size(max = 500, message = "File URL cannot exceed 500 characters")
    private String fileUrl;

    @Size(max = 50, message = "Version cannot exceed 50 characters")
    private String version;

    private Boolean isActive;
}
