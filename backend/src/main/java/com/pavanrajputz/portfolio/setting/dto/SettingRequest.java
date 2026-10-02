package com.pavanrajputz.portfolio.setting.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SettingRequest {

    @NotBlank(message = "Setting key cannot be blank")
    @Size(max = 100, message = "Setting key cannot exceed 100 characters")
    private String settingKey;

    @Size(max = 10000, message = "Setting value cannot exceed 10000 characters")
    private String settingValue;

    @Size(max = 50, message = "Type cannot exceed 50 characters")
    private String type;

    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    private String description;

    private Boolean isPublic;
}