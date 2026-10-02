package com.pavanrajputz.portfolio.resume.controller;

import com.pavanrajputz.portfolio.resume.dto.ResumeResponse;
import com.pavanrajputz.portfolio.resume.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class PublicResumeController {

    private final ResumeService service;

    @GetMapping
    public ResponseEntity<ResumeResponse> getActiveResume() {

        return ResponseEntity.ok(
                service.getActiveResume()
        );
    }
}
