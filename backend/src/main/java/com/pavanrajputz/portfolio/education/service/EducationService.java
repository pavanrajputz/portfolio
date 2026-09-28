package com.pavanrajputz.portfolio.education.service;

import com.pavanrajputz.portfolio.education.dto.EducationRequest;
import com.pavanrajputz.portfolio.education.dto.EducationResponse;
import com.pavanrajputz.portfolio.education.entity.Education;
import com.pavanrajputz.portfolio.education.repository.EducationRepository;
import com.pavanrajputz.portfolio.exception.ResourceNotFound;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationService {

    private final EducationRepository repo;

    public EducationResponse createEducation(EducationRequest request){

        validateDates(request);

        Education edu = Education
                .builder()
                .institution(request.getInstitution())
                .degree(request.getDegree())
                .fieldOfStudy(request.getFieldOfStudy())
                .description(request.getDescription())
                .grade(request.getGrade())
                .location(request.getLocation())
                .startDate(request.getStartDate())
                .currentlyStudying(
                        request.getCurrentlyStudying() != null &&
                                request.getCurrentlyStudying()
                )
                .endDate(request.getEndDate())
                .build();

        Education saved = repo.save(edu);

        return mapToResponse(saved);
    }

    public List<EducationResponse> getAllEducations(){
        return repo.findAllByIsDeletedIsFalse()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public EducationResponse getEducationById(Long id){
        Education edu = repo.findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "No education field found for id: "+id
                        )
                );

        return mapToResponse(edu);
    }

    public EducationResponse updateEducation(
            Long id,
            EducationRequest request
    ){

        validateDates(request);

        Education edu = repo.findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "No education field found for id: "+ id
                        )
                );

        edu.setInstitution(request.getInstitution());
        edu.setDegree(request.getDegree());
        edu.setFieldOfStudy(request.getFieldOfStudy());
        edu.setDescription(request.getDescription());
        edu.setGrade(request.getGrade());
        edu.setLocation(request.getLocation());
        edu.setStartDate(request.getStartDate());
        edu.setCurrentlyStudying(
                request.getCurrentlyStudying() != null &&
                        request.getCurrentlyStudying()
        );
        edu.setEndDate(request.getEndDate());

        Education saved = repo.save(edu);

        return mapToResponse(saved);
    }

    public void deleteEducation(Long id){
        Education edu = repo.findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "No education field found for id: "+ id
                        )
                );

        edu.setIsDeleted(true);
    }

    private void validateDates(EducationRequest request){
        boolean currStudying = (request.getCurrentlyStudying() != null &&
                request.getCurrentlyStudying());

        if(currStudying && request.getEndDate() != null){
            throw new IllegalArgumentException(
                    "End date must be null when currently studying is true"
            );
        }

        if (!currStudying && request.getEndDate() == null) {

            throw new IllegalArgumentException(
                    "End date is required when currently studying is false"
            );
        }

        if (request.getEndDate() != null
                && request.getEndDate().isBefore(request.getStartDate())) {

            throw new IllegalArgumentException(
                    "End date cannot be before start date"
            );
        }
    }

    private EducationResponse mapToResponse(Education edu){
        return EducationResponse.builder()
                .id(edu.getId())
                .institution(edu.getInstitution())
                .degree(edu.getDegree())
                .fieldOfStudy(edu.getFieldOfStudy())
                .description(edu.getDescription())
                .grade(edu.getGrade())
                .location(edu.getLocation())
                .currentlyStudying(edu.getCurrentlyStudying())
                .startDate(edu.getStartDate())
                .endDate(edu.getEndDate())
                .createdAt(edu.getCreatedAt())
                .updatedAt(edu.getUpdatedAt())
                .build();
    }

}
