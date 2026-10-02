package com.pavanrajputz.portfolio.activity.dto;


import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityResponse {

    private Long id;
    private String title;
    private String description;
    private LocalDate activityDate;
    private String type;
    private String imageUrl;
    private String externalUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
