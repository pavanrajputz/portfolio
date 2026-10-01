import api from "./api";

import type {
    Skill,
    SkillRequest,
} from "../types/Skill";

const SKILL_API = "/api/admin/skills";

export const getSkills = async (): Promise<Skill[]> => {
    const response = await api.get<Skill[]>(
        SKILL_API
    );

    return response.data;
};

export const getSkillById = async (
    id: number
): Promise<Skill> => {
    const response = await api.get<Skill>(
        `${SKILL_API}/${id}`
    );

    return response.data;
};

export const createSkill = async (
    skill: SkillRequest
): Promise<Skill> => {
    const response = await api.post<Skill>(
        SKILL_API,
        skill
    );

    return response.data;
};

export const updateSkill = async (
    id: number,
    skill: SkillRequest
): Promise<Skill> => {
    const response = await api.put<Skill>(
        `${SKILL_API}/${id}`,
        skill
    );

    return response.data;
};

export const deleteSkill = async (
    id: number
): Promise<void> => {
    await api.delete(
        `${SKILL_API}/${id}`
    );
};