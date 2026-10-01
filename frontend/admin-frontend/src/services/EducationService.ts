import api from "./api";

import type {
    Education,
    EducationRequest,
} from "../types/Education";

const EDUCATION_API = "/api/admin/education";

export const getEducations = async (): Promise<Education[]> => {
    const response = await api.get<Education[]>(
        EDUCATION_API
    );

    return response.data;
};

export const getEducationById = async (
    id: number
): Promise<Education> => {
    const response = await api.get<Education>(
        `${EDUCATION_API}/${id}`
    );

    return response.data;
};

export const createEducation = async (
    education: EducationRequest
): Promise<Education> => {
    const response = await api.post<Education>(
        EDUCATION_API,
        education
    );

    return response.data;
};

export const updateEducation = async (
    id: number,
    education: EducationRequest
): Promise<Education> => {
    const response = await api.put<Education>(
        `${EDUCATION_API}/${id}`,
        education
    );

    return response.data;
};

export const deleteEducation = async (
    id: number
): Promise<void> => {
    await api.delete(
        `${EDUCATION_API}/${id}`
    );
};