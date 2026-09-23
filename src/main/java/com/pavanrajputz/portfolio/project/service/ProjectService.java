package com.pavanrajputz.portfolio.project.service;

import com.pavanrajputz.portfolio.exception.ResourceNotFound;
import com.pavanrajputz.portfolio.project.dto.ProjectRequest;
import com.pavanrajputz.portfolio.project.dto.ProjectResponse;
import com.pavanrajputz.portfolio.project.entity.Project;
import com.pavanrajputz.portfolio.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository repo;

    public ProjectResponse createProject(
            ProjectRequest request
    ){
        Project project = Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .githubUrl(request.getGithubUrl())
                .liveUrl(request.getLiveUrl())
                .technologies(request.getTechnologies())
                .featured(request.getFeatured())
                .build();

        Project saved =  repo.save(project);

        return mapToResponse(saved);
    }

    public List<ProjectResponse> getAllProjects(){
        return repo.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public ProjectResponse getProjectById(Long id){
        Project project = repo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "Project not found with id " + id
                        )
                );
        return mapToResponse(project);
    }

    public ProjectResponse updateProject(
            Long id,
            ProjectRequest request
    ){
        Project project = repo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "Project not found with id " + id
                        )
                );

        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setImageUrl(request.getImageUrl());
        project.setGithubUrl(request.getGithubUrl());
        project.setLiveUrl(request.getLiveUrl());
        project.setTechnologies(request.getTechnologies());
        project.setFeatured(
                request.getFeatured()!=null && request.getFeatured()
        );

        Project saved = repo.save(project);

        return mapToResponse(saved);
    }

    public void deleteProjectById(Long id){
        Project project = repo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "Project not found with id " + id
                        )
                );

        project.setIsDeleted(true);
    }

    private ProjectResponse mapToResponse(Project project){
        return ProjectResponse.builder()
                .title(project.getTitle())
                .description(project.getDescription())
                .imageUrl(project.getImageUrl())
                .githubUrl(project.getGithubUrl())
                .liveUrl(project.getLiveUrl())
                .featured(project.getFeatured())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }

}
