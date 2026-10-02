import api from "./api";

import type {
    Resume,
    ResumeRequest,
} from "../types/Resume";

const RESUME_API = "/api/admin/resumes";

export const getResumes = async (): Promise<Resume[]> => {
    const response = await api.get<Resume[]>(
        RESUME_API
    );

    return response.data;
};

export const getResumeById = async (
    id: number
): Promise<Resume> => {
    const response = await api.get<Resume>(
        `${RESUME_API}/${id}`
    );

    return response.data;
};

export const createResume = async (
    resume: ResumeRequest
): Promise<Resume> => {
    const response = await api.post<Resume>(
        RESUME_API,
        resume
    );

    return response.data;
};

export const updateResume = async (
    id: number,
    resume: ResumeRequest
): Promise<Resume> => {
    const response = await api.put<Resume>(
        `${RESUME_API}/${id}`,
        resume
    );

    return response.data;
};

export const deleteResume = async (
    id: number
): Promise<void> => {
    await api.delete(
        `${RESUME_API}/${id}`
    );
};