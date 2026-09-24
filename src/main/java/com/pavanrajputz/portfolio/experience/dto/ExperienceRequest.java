package com.pavanrajputz.portfolio.experience.dto;

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
public class ExperienceRequest {

    @NotBlank(message = "Company cannot be blank")
    @Size(max = 150, message = "Company cannot exceed 150 characters")
    private String comapny;

    @NotBlank(message = "Position cannot be blank")
    @Size(max = 150, message = "Position cannot exceed 150 characters")
    private String position;

    @Size(max = 150, message = "Location cannot exceed 150 characters")
    private String location;

    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    private String description;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    private LocalDate endDate;

    private Boolean currentlyWorking;

    @Size(max = 2000, message = "Technologies cannot exceed 2000 characters")
    private String technologies;
}
