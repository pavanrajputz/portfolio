package com.pavanrajputz.portfolio.education.controller;

import com.pavanrajputz.portfolio.education.dto.EducationRequest;
import com.pavanrajputz.portfolio.education.dto.EducationResponse;
import com.pavanrajputz.portfolio.education.service.EducationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/education")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class EducationController {

    private final EducationService service;

    @PostMapping
    public ResponseEntity<EducationResponse> createEducation(
            @Valid @RequestBody EducationRequest request
            ){
        EducationResponse response = service.createEducation(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<EducationResponse>> getAllEducation(){
        return ResponseEntity
                .ok(
                        service.getAllEducations()
                );
    }

    @GetMapping("{id}")
    public ResponseEntity<EducationResponse> getEducationById(
            @PathVariable Long id
    ){
        return ResponseEntity
                .ok(
                        service.getEducationById(id)
                );
    }

    @PutMapping("{id}")
    public ResponseEntity<EducationResponse> updateEducation(
            @PathVariable Long id,
            @Valid @RequestBody EducationRequest request
    ){
        return ResponseEntity
                .ok(
                        service.updateEducation(id, request)
                );
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteEducation(
            @PathVariable Long id
    ){
        service.deleteEducation(id);
        return ResponseEntity.noContent().build();
    }
}
