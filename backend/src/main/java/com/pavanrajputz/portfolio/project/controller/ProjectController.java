package com.pavanrajputz.portfolio.project.controller;

import com.pavanrajputz.portfolio.project.dto.ProjectRequest;
import com.pavanrajputz.portfolio.project.dto.ProjectResponse;
import com.pavanrajputz.portfolio.project.service.ProjectService;
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
@RequestMapping("/api/admin/projects")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class ProjectController {

    private final ProjectService service;

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(
            @Valid @RequestBody ProjectRequest request
            ){
        ProjectResponse response = service.createProject(request);
        return ResponseEntity.
                status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getAllProjects(){
        return ResponseEntity.ok(
                service.getAllProjects()
        );
    }

    @GetMapping("{id}")
    public ResponseEntity<ProjectResponse> getProjectById(
            @PathVariable Long id
    ){
        return ResponseEntity
                .ok(service.getProjectById(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<ProjectResponse> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequest request
    ){
        ProjectResponse response = service.updateProject(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteProjectById(
            @PathVariable Long id
    ){
        service.deleteProjectById(id);
        return ResponseEntity.noContent().build();
    }

}
