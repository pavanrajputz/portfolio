package com.pavanrajputz.portfolio.experience.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExperienceResponse {

    private Long id;
    private String company;
    private String position;
    private String location;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String technologies;
    private Boolean currentlyWorking;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
