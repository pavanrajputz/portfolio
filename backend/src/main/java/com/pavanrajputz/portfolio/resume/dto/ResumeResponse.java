package com.pavanrajputz.portfolio.resume.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeResponse {

    private Long id;
    private String title;
    private String description;
    private String fileUrl;
    private String version;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
