package com.pavanrajputz.portfolio.resume.controller;


import com.pavanrajputz.portfolio.resume.dto.ResumeRequest;
import com.pavanrajputz.portfolio.resume.dto.ResumeResponse;
import com.pavanrajputz.portfolio.resume.service.ResumeService;
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
@RequestMapping("/api/admin/resumes")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class ResumeController {

    private final ResumeService service;

    @PostMapping
    public ResponseEntity<ResumeResponse> createResume(
            @Valid @RequestBody ResumeRequest request
    ) {

        ResumeResponse response =
                service.createResume(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<ResumeResponse>> getAllResumes() {

        return ResponseEntity.ok(
                service.getAllResumes()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResumeResponse> getResumeById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                service.getResumeById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResumeResponse> updateResume(
            @PathVariable Long id,
            @Valid @RequestBody ResumeRequest request
    ) {

        return ResponseEntity.ok(
                service.updateResume(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResume(
            @PathVariable Long id
    ) {

        service.deleteResume(id);

        return ResponseEntity.noContent().build();
    }
}
