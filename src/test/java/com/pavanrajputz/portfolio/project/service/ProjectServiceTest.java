package com.pavanrajputz.portfolio.project.service;

import com.pavanrajputz.portfolio.exception.ResourceNotFound;
import com.pavanrajputz.portfolio.project.dto.ProjectRequest;
import com.pavanrajputz.portfolio.project.dto.ProjectResponse;
import com.pavanrajputz.portfolio.project.entity.Project;
import com.pavanrajputz.portfolio.project.repository.ProjectRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProjectServiceTest {
    @Mock
    private ProjectRepository repo;

    @InjectMocks
    private ProjectService service;

    @Test
    void shouldReturnAllProjects(){
        Project project1 = Project.builder()
                .id(1L)
                .title("Portfolio")
                .description("My portfolio project")
                .build();

        Project project2 = Project.builder()
                .id(2L)
                .title("Expense Tracker")
                .description("Expense tracking application")
                .build();

        when(repo.findAllByIsDeletedIsFalse())
                .thenReturn(List.of(project1, project2));

        List<ProjectResponse> result = service.getAllProjects();

        assertEquals(2, result.size());
        assertEquals("Portfolio", result.get(0).getTitle());
        assertEquals("Expense Tracker", result.get(1).getTitle());
    }

    @Test
    void shouldReturnProjectById() {

        Project project = Project.builder()
                .id(1L)
                .title("Portfolio")
                .description("My portfolio project")
                .build();

        when(repo.findByIdAndIsDeletedIsFalse(1L))
                .thenReturn(Optional.of(project));

        ProjectResponse result = service.getProjectById(1L);

        assertEquals(1L, result.getId());
        assertEquals("Portfolio", result.getTitle());
        assertEquals("My portfolio project", result.getDescription());
    }

    @Test
    void shouldThrowExceptionWhenProjectNotFound() {

        when(repo.findByIdAndIsDeletedIsFalse(99L))
                .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFound.class,
                () -> service.getProjectById(99L)
        );
    }

    @Test
    void shouldCreateProject() {

        ProjectRequest request = ProjectRequest.builder()
                .title("Portfolio")
                .description("My portfolio project")
                .imageUrl("image.jpg")
                .githubUrl("https://github.com/project")
                .liveUrl("https://portfolio.com")
                .technologies("Java, Spring Boot, MySQL")
                .featured(true)
                .build();

        Project savedProject = Project.builder()
                .id(1L)
                .title("Portfolio")
                .description("My portfolio project")
                .imageUrl("image.jpg")
                .githubUrl("https://github.com/project")
                .liveUrl("https://portfolio.com")
                .technologies("Java, Spring Boot, MySQL")
                .featured(true)
                .build();

        when(repo.save(any(Project.class)))
                .thenReturn(savedProject);

        ProjectResponse result = service.createProject(request);

        assertEquals(1L, result.getId());
        assertEquals("Portfolio", result.getTitle());
        assertEquals(true, result.getFeatured());

        verify(repo).save(any(Project.class));
    }

    @Test
    void shouldUpdateProject() {

        Project existingProject = Project.builder()
                .id(1L)
                .title("Old Title")
                .description("Old description")
                .featured(false)
                .build();

        ProjectRequest request = ProjectRequest.builder()
                .title("Updated Portfolio")
                .description("Updated description")
                .featured(true)
                .build();

        when(repo.findByIdAndIsDeletedIsFalse(1L))
                .thenReturn(Optional.of(existingProject));

        when(repo.save(any(Project.class)))
                .thenReturn(existingProject);

        ProjectResponse result = service.updateProject(1L, request);

        assertEquals("Updated Portfolio", result.getTitle());
        assertEquals("Updated description", result.getDescription());
        assertEquals(true, result.getFeatured());

        verify(repo).findByIdAndIsDeletedIsFalse(1L);
        verify(repo).save(existingProject);
    }

    @Test
    void shouldSoftDeleteProject() {

        Project project = Project.builder()
                .id(1L)
                .title("Portfolio")
                .isDeleted(false)
                .build();

        when(repo.findByIdAndIsDeletedIsFalse(1L))
                .thenReturn(Optional.of(project));

        service.deleteProjectById(1L);

        assertEquals(true, project.getIsDeleted());

        verify(repo).findByIdAndIsDeletedIsFalse(1L);
        verify(repo).save(project);
    }

    @Test
    void shouldThrowExceptionWhenDeletingNonExistingProject() {

        when(repo.findByIdAndIsDeletedIsFalse(99L))
                .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFound.class,
                () -> service.deleteProjectById(99L)
        );

        verify(repo, never()).save(any(Project.class));
    }
}
