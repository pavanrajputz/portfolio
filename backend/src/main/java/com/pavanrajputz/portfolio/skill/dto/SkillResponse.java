package com.pavanrajputz.portfolio.skill.dto;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SkillResponse {

    private Long id;
    private String name;
    private String category;
    private Integer proficiency;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
