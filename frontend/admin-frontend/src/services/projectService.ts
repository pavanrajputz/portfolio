import api from "./api";
import type {Project} from "../types/Project.ts";

const PROJECT_API = "/api/admin/projects";

export const getProjects = async (): Promise<Project[]> => {
    const response = await api.get<Project[]>(PROJECT_API);
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
    project: {
        title: string;
        description: string;
        imageUrl?: string;
        githubUrl?: string;
        liveUrl?: string;
        technologies: string;
        featured: boolean;
    }
): Promise<Project> => {
    const response = await api.post<Project>(
        PROJECT_API,
        project
    );

    return response.data;
};

export const updateProject = async (
    id: number,
    project: {
        title: string;
        description: string;
        imageUrl?: string;
        githubUrl?: string;
        liveUrl?: string;
        technologies: string;
        featured: boolean;
    }
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
    await api.delete(`${PROJECT_API}/${id}`);
};