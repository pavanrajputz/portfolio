package com.pavanrajputz.portfolio.setting.controller;


import com.pavanrajputz.portfolio.setting.dto.SettingRequest;
import com.pavanrajputz.portfolio.setting.dto.SettingResponse;
import com.pavanrajputz.portfolio.setting.service.SettingService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/admin/settings")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class SettingController {

    private final SettingService settingService;

    @PostMapping
    public ResponseEntity<SettingResponse> createSetting(
            @Valid @RequestBody SettingRequest request
    ) {

        SettingResponse response =
                settingService.createSetting(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<SettingResponse>> getAllSettings() {

        return ResponseEntity.ok(
                settingService.getAllSettings()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<SettingResponse> getSettingById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                settingService.getSettingById(id)
        );
    }

    @GetMapping("/key/{key}")
    public ResponseEntity<SettingResponse> getSettingByKey(
            @PathVariable String key
    ) {

        return ResponseEntity.ok(
                settingService.getSettingByKey(key)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<SettingResponse> updateSetting(
            @PathVariable Long id,
            @Valid @RequestBody SettingRequest request
    ) {

        return ResponseEntity.ok(
                settingService.updateSetting(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSetting(
            @PathVariable Long id
    ) {

        settingService.deleteSetting(id);

        return ResponseEntity.noContent().build();
    }
}
