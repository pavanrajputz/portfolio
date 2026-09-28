package com.pavanrajputz.portfolio.project.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequest {

    @NotBlank(message = "Title can not be blank")
    @Size(max = 150, message = "Title can not be this long")
    private String title;

    @NotBlank
    @Size(max = 500, message = "description is too large")
    private String description;

    @Size(max = 500, message = "Image URL cannot exceed 500 characters")
    private String imageUrl;

    @Size(max = 500, message = "Github URL cannot exceed 500 characters")
    private String githubUrl;

    @Size(max = 500, message = "Live URL cannot exceed 500 characters")
    private String liveUrl;

    @NotBlank(message = "Technologies are required")
    @Size(max = 1000, message = "Technologies cannot exceed 1000 characters")
    private String technologies;

    private Boolean featured;
}
