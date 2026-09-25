package com.pavanrajputz.portfolio.experience.controller;

import com.pavanrajputz.portfolio.experience.dto.ExperienceRequest;
import com.pavanrajputz.portfolio.experience.dto.ExperienceResponse;
import com.pavanrajputz.portfolio.experience.service.ExperienceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/experiences")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class ExperienceController {

    private final ExperienceService service;

    @PostMapping
    public ResponseEntity<ExperienceResponse> createExperience(
            @Valid @RequestBody ExperienceRequest request
            ){
        ExperienceResponse response = service.createExperience(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public  ResponseEntity<List<ExperienceResponse>> getAllExperiences(){
        return ResponseEntity
                .ok(
                        service.getAllExperiences()
                );
    }

    @GetMapping("{id}")
    public  ResponseEntity<ExperienceResponse> getExperienceById(
            @PathVariable Long id
    ){
        return ResponseEntity
                .ok(
                        service.getExperienceById(id)
                );
    }

    @PutMapping("{id}")
    public ResponseEntity<ExperienceResponse> updateExperience(
            @PathVariable Long id,
            @Valid @RequestBody ExperienceRequest request
    ){
        return ResponseEntity
                .ok(
                        service.updateExperience(id, request)
                );
    }

    @DeleteMapping ("{id}")
    public ResponseEntity<Void> deleteExperienceById(
            @PathVariable Long id
    ){
        service.deletedExperience(id);
        return ResponseEntity
                .noContent()
                .build();
    }
}
