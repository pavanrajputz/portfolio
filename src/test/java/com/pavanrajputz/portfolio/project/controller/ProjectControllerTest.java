package com.pavanrajputz.portfolio.project.controller;

import com.pavanrajputz.portfolio.project.dto.ProjectRequest;
import com.pavanrajputz.portfolio.project.dto.ProjectResponse;
import com.pavanrajputz.portfolio.project.service.ProjectService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProjectController.class)
public class ProjectControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProjectService service;

    @Test
    void shouldGetAllProjects() throws Exception {

        ProjectResponse project = ProjectResponse.builder()
                .id(1L)
                .title("Portfolio")
                .description("My portfolio project")
                .build();

        when(service.getAllProjects())
                .thenReturn(List.of(project));

        mockMvc.perform(
                        get("/api/admin/projects")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].title").value("Portfolio"))
                .andExpect(jsonPath("$[0].description")
                        .value("My portfolio project"));
    }

    @Test
    void shouldCreateProject() throws Exception {
        ProjectResponse response = ProjectResponse.builder()
                .id(1L)
                .title("Portfolio")
                .description("My portfolio project")
                .build();

        when(service.createProject(any(ProjectRequest.class)))
                .thenReturn(response);

        String requestBody = """
            {
                "title": "Portfolio",
                "description": "My portfolio project",
                "imageUrl": "image.jpg",
                "githubUrl": "https://github.com/project",
                "liveUrl": "https://portfolio.com",
                "technologies": "Java, Spring Boot",
                "featured": true
            }
            """;

        mockMvc.perform(
                        post("/api/admin/projects")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBody)
                )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Portfolio"));
    }
}
