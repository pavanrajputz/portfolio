import api from "./api";

import type {
    Experience,
    ExperienceRequest,
} from "../types/Experience";

const EXPERIENCE_API = "/api/admin/experiences";

export const getExperiences = async (): Promise<Experience[]> => {
    const response = await api.get<Experience[]>(
        EXPERIENCE_API
    );

    return response.data;
};

export const getExperienceById = async (
    id: number
): Promise<Experience> => {
    const response = await api.get<Experience>(
        `${EXPERIENCE_API}/${id}`
    );

    return response.data;
};

export const createExperience = async (
    experience: ExperienceRequest
): Promise<Experience> => {
    const response = await api.post<Experience>(
        EXPERIENCE_API,
        experience
    );

    return response.data;
};

export const updateExperience = async (
    id: number,
    experience: ExperienceRequest
): Promise<Experience> => {
    const response = await api.put<Experience>(
        `${EXPERIENCE_API}/${id}`,
        experience
    );

    return response.data;
};

export const deleteExperience = async (
    id: number
): Promise<void> => {
    await api.delete(
        `${EXPERIENCE_API}/${id}`
    );
};