package com.pavanrajputz.portfolio.setting.controller;

import com.pavanrajputz.portfolio.setting.dto.SettingResponse;
import com.pavanrajputz.portfolio.setting.service.SettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class PublicSettingController {

    private final SettingService settingService;

    @GetMapping
    public ResponseEntity<List<SettingResponse>> getPublicSettings() {

        return ResponseEntity.ok(
                settingService.getPublicSettings()
        );
    }

    @GetMapping("/{key}")
    public ResponseEntity<SettingResponse> getPublicSetting(
            @PathVariable String key
    ) {

        SettingResponse setting =
                settingService.getSettingByKey(key);

        if (!Boolean.TRUE.equals(setting.getIsPublic())) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(setting);
    }
}
