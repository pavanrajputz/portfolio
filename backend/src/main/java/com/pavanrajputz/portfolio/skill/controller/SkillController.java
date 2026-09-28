package com.pavanrajputz.portfolio.skill.controller;

import com.pavanrajputz.portfolio.skill.dto.SkillRequest;
import com.pavanrajputz.portfolio.skill.dto.SkillResponse;
import com.pavanrajputz.portfolio.skill.service.SkillService;
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
@RequestMapping("/api/admin/skills")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class SkillController {

    private final SkillService service;

    @PostMapping
    public ResponseEntity<SkillResponse> createSkill(
            @Valid @RequestBody SkillRequest request
            ){
        SkillResponse response = service.createSkill(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<SkillResponse>> getAllSkills(){
        return ResponseEntity.ok(
                service.getAllSkills()
        );
    }

    @GetMapping("{id}")
    public ResponseEntity<SkillResponse> getSkillById(
            @PathVariable Long id
    ){
        return ResponseEntity.ok(
                service.getSkillById(id)
        );
    }

    @PutMapping("{id}")
    public ResponseEntity<SkillResponse> updateSkill(
            @PathVariable Long id,
            @Valid @RequestBody SkillRequest request
    ){
        return ResponseEntity
                .ok(
                        service.updateSkill(id, request)
                );
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void>  deleteSkillById(
            @PathVariable Long id
    ){
        service.deleteSkillById(id);
        return ResponseEntity.noContent().build();
    }

}
