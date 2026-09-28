package com.pavanrajputz.portfolio.education.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EducationResponse {

    private Long id;
    private String institution;
    private String degree;
    private String fieldOfStudy;
    private String description;
    private String grade;
    private Boolean currentlyStudying;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
