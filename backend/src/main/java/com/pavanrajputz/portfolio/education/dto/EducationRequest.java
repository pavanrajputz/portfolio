package com.pavanrajputz.portfolio.education.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EducationRequest {

    @NotBlank(message = "Institution cannot be blank")
    @Size(max = 200, message = "Institution cannot exceed 200 characters")
    private String institution;

    @NotBlank(message = "Degree cannot be blank")
    @Size(max = 150, message = "Degree cannot exceed 150 characters")
    private String degree;

    @Size(max = 150, message = "Field of study cannot exceed 150 characters")
    private String fieldOfStudy;

    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    private String description;

    @Size(max = 100, message = "Grade cannot exceed 100 characters")
    private String grade;

    private Boolean currentlyStudying;

    @Size(max = 150, message = "Location cannot exceed 150 characters")
    private String location;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    private LocalDate endDate;
}
