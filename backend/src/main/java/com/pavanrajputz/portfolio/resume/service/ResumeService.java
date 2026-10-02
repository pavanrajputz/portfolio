package com.pavanrajputz.portfolio.resume.service;

import com.pavanrajputz.portfolio.exception.ResourceNotFound;
import com.pavanrajputz.portfolio.resume.dto.ResumeRequest;
import com.pavanrajputz.portfolio.resume.dto.ResumeResponse;
import com.pavanrajputz.portfolio.resume.entity.Resume;
import com.pavanrajputz.portfolio.resume.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository repo;

    public ResumeResponse createResume(
            ResumeRequest request
    ){

        boolean isActive = request.getIsActive() == null ||
                request.getIsActive();

        if(isActive){
            deactivateCurrentResume();
        }

        Resume res = Resume
                .builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .fileUrl(request.getFileUrl())
                .version(request.getVersion())
                .isActive(request.getIsActive())
                .build();

        Resume saved = repo.save(res);

        return mapToResponse(saved);
    }

    public List<ResumeResponse> getAllResumes(){
        return repo.findAllByIsDeletedIsFalse()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public ResumeResponse getResumeById(Long id){
        Resume resume = repo
                .findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "No resume found for id: " + id
                        )
                );

        return mapToResponse(resume);
    }

    public ResumeResponse getActiveResume() {

        Resume resume = repo
                .findByIsActiveIsTrueAndIsDeletedIsFalse()
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "No active resume found"
                        )
                );

        return mapToResponse(resume);
    }

    public ResumeResponse updateResume(
            Long id,
            ResumeRequest request
    ){
        Resume resume = repo
                .findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "No resume found for id: " + id
                        )
                );

        boolean isActive =
                request.getIsActive() == null
                        ? resume.getIsActive()
                        : request.getIsActive();

        if (isActive) {
            deactivateCurrentResume(id);
        }

        resume.setTitle(request.getTitle());
        resume.setDescription(request.getDescription());
        resume.setFileUrl(request.getFileUrl());
        resume.setVersion(request.getVersion());
        resume.setIsActive(isActive);

        Resume updatedResume = repo.save(resume);

        return mapToResponse(updatedResume);
    }

    public void deleteResume(Long id) {

        Resume resume = repo
                .findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "No resume found for id: " + id
                        )
                );

        resume.setIsDeleted(true);
        resume.setIsActive(false);

        repo.save(resume);
    }

    private void deactivateCurrentResume() {

        repo
                .findByIsActiveIsTrueAndIsDeletedIsFalse()
                .ifPresent(resume -> {
                    resume.setIsActive(false);
                    repo.save(resume);
                });
    }

    private void deactivateCurrentResume(Long resumeId) {

        repo
                .findByIsActiveIsTrueAndIsDeletedIsFalse()
                .ifPresent(activeResume -> {

                    if (!activeResume.getId().equals(resumeId)) {
                        activeResume.setIsActive(false);
                        repo.save(activeResume);
                    }
                });
    }

    private ResumeResponse mapToResponse(Resume resume) {

        return ResumeResponse
                .builder()
                .id(resume.getId())
                .title(resume.getTitle())
                .description(resume.getDescription())
                .fileUrl(resume.getFileUrl())
                .version(resume.getVersion())
                .isActive(resume.getIsActive())
                .createdAt(resume.getCreatedAt())
                .updatedAt(resume.getUpdatedAt())
                .build();
    }
}
