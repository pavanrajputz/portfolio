import api from "./api";

import type { Experience } from "../types/Experience";
import type { Project } from "../types/Project";

export const getExperiences = async (): Promise<Experience[]> => {
    const response = await api.get<Experience[]>("/experiences");
    return response.data;
};

export const getProjects = async (): Promise<Project[]> => {
    const response = await api.get<Project[]>("/projects");
    return response.data;
};