import api from "./api";

import type {
    Project,
    ProjectRequest,
} from "../types/Project";

const PROJECT_API = "/api/admin/projects";

export const getProjects = async (): Promise<Project[]> => {
    const response = await api.get<Project[]>(
        PROJECT_API
    );

    return response.data;
};

export const getProjectById = async (
    id: number
): Promise<Project> => {
    const response = await api.get<Project>(
        `${PROJECT_API}/${id}`
    );

    return response.data;
};

export const createProject = async (
    project: ProjectRequest
): Promise<Project> => {
    const response = await api.post<Project>(
        PROJECT_API,
        project
    );

    return response.data;
};

export const updateProject = async (
    id: number,
    project: ProjectRequest
): Promise<Project> => {
    const response = await api.put<Project>(
        `${PROJECT_API}/${id}`,
        project
    );

    return response.data;
};

export const deleteProject = async (
    id: number
): Promise<void> => {
    await api.delete(
        `${PROJECT_API}/${id}`
    );
};