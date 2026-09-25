package com.pavanrajputz.portfolio.experience.service;

import com.pavanrajputz.portfolio.exception.ResourceNotFound;
import com.pavanrajputz.portfolio.experience.dto.ExperienceRequest;
import com.pavanrajputz.portfolio.experience.dto.ExperienceResponse;
import com.pavanrajputz.portfolio.experience.entity.Experience;
import com.pavanrajputz.portfolio.experience.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository repo;

    public ExperienceResponse createExperience(
            ExperienceRequest request
    ){

        validateDates(request);

        Experience exp = Experience.builder()
                .company(request.getCompany())
                .position(request.getPosition())
                .location(request.getLocation())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .description(request.getDescription())
                .currentlyWorking(
                        request.getCurrentlyWorking() != null &&
                                request.getCurrentlyWorking()
                )
                .technologies(request.getTechnologies())
                .build();

        Experience saved = repo.save(exp);

        return mapToResponse(saved);
    }

    public List<ExperienceResponse> getAllExperiences(){
        return repo.findAllByIsDeletedIsFalse()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public ExperienceResponse getExperienceById(Long id){
        Experience exp = repo.findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound("Experience not found with id " + id)
                );

        return mapToResponse(exp);
    }

    public ExperienceResponse updateExperience(
            Long id,
            ExperienceRequest request
    ){

        validateDates(request);

        Experience exp = repo.findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound("Experience not found with id " + id)
                );

        exp.setCompany(request.getCompany());
        exp.setPosition(request.getPosition());
        exp.setLocation(request.getLocation());
        exp.setStartDate(request.getStartDate());
        exp.setEndDate(request.getEndDate());
        exp.setDescription(request.getDescription());
        exp.setTechnologies(request.getTechnologies());
        exp.setCurrentlyWorking(
                request.getCurrentlyWorking() != null &&
                        request.getCurrentlyWorking()
        );

        Experience saved = repo.save(exp);

        return mapToResponse(saved);
    }

    public void deletedExperience(Long id){
        Experience exp = repo.findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound("Experience not found with id " + id)
                );

        exp.setIsDeleted(true);
        repo.save(exp);
    }

    private void validateDates(ExperienceRequest request){
        boolean currWorking = request.getCurrentlyWorking() != null &&
                request.getCurrentlyWorking();

        if(currWorking && request.getEndDate() != null){
            throw new IllegalArgumentException(
                    "End date must be null when you are working currently"
            );
        }

        if(!currWorking && request.getEndDate() == null){
            throw new IllegalArgumentException(
                    "End date is required when you are not working currently"
            );
        }

        if(
                request.getEndDate() != null &&
                        request.getEndDate().isBefore(request.getStartDate())
        ){
            throw new IllegalArgumentException(
                    "End date must be before start date"
            );
        }

    }

    private ExperienceResponse mapToResponse(Experience exp){
        return ExperienceResponse.builder()
                .id(exp.getId())
                .company(exp.getCompany())
                .position(exp.getPosition())
                .location(exp.getLocation())
                .description(exp.getDescription())
                .startDate(exp.getStartDate())
                .endDate(exp.getEndDate())
                .technologies(exp.getTechnologies())
                .currentlyWorking(exp.getCurrentlyWorking())
                .createdAt(exp.getCreatedAt())
                .updatedAt(exp.getUpdatedAt())
                .build();
    }

}
