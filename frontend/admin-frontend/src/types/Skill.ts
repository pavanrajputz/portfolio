export interface Skill {
    id: number;
    name: string;
    category: string;
    proficiency: number;
    createdAt: string;
    updatedAt: string;
}

export interface SkillRequest {
    name: string;
    category: string;
    proficiency: number;
}