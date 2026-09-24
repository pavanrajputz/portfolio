package com.pavanrajputz.portfolio.skill.service;


import com.pavanrajputz.portfolio.exception.ResourceNotFound;
import com.pavanrajputz.portfolio.skill.dto.SkillRequest;
import com.pavanrajputz.portfolio.skill.dto.SkillResponse;
import com.pavanrajputz.portfolio.skill.entity.Skill;
import com.pavanrajputz.portfolio.skill.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository repo;

    public SkillResponse createSkill(SkillRequest request){
        Skill skill = Skill.builder()
                .name(request.getName())
                .category(request.getCategory())
                .proficiency(
                        request.getProficiency() != null
                        ? request.getProficiency()
                                : 0
                )
                .build();

        Skill saved =  repo.save(skill);

        return mapToResponse(saved);
    }

    public List<SkillResponse> getAllSkills(){
        return repo.findAllByIsDeletedIsFalse()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public SkillResponse getSkillById(Long id){
        Skill skill = repo.findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound("Skill with id " + id + " not found")
                );

        return mapToResponse(skill);
    }

    public SkillResponse updateSkill(Long id,
                                     SkillRequest request){
        Skill skill = repo.findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound("Skill with id " + id + " not found")
                );

        skill.setName(request.getName());
        skill.setCategory(request.getCategory());
        skill.setProficiency(request.getProficiency());

        Skill saved = repo.save(skill);

        return mapToResponse(saved);
    }

    public void deleteSkillById(Long id){
        Skill skill = repo.findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound("Skill with id " + id + " not found")
                );

        skill.setIsDeleted(true);
        repo.save(skill);
    }

    private SkillResponse mapToResponse(Skill skill){
        return SkillResponse.builder()
                .id(skill.getId())
                .name(skill.getName())
                .category(skill.getCategory())
                .proficiency(skill.getProficiency())
                .createdAt(skill.getCreatedAt())
                .updatedAt(skill.getUpdatedAt())
                .build();
    }


}
