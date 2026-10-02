package com.pavanrajputz.portfolio.setting.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SettingResponse {

    private Long id;
    private String settingKey;
    private String settingValue;
    private String type;
    private String description;
    private Boolean isPublic;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}