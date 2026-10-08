import api from "./api";

import type { Experience } from "../types/Experience";
import type { Project } from "../types/Project";
import type { Profile } from "../types/Profile";
import type { Skill } from "../types/Skill";
import type { Education } from "../types/Education";
import type { Certificate } from "../types/Certificate";


/* =========================================
   EXPERIENCE
   ========================================= */

export const getExperiences = async (): Promise<Experience[]> => {
    const response = await api.get<Experience[]>("/experiences");
    return response.data;
};


/* =========================================
   PROJECTS
   ========================================= */

export const getProjects = async (): Promise<Project[]> => {
    const response = await api.get<Project[]>("/projects");
    return response.data;
};


/* =========================================
   PROFILE
   ========================================= */

export const getProfile = async (): Promise<Profile> => {
    const response = await api.get<Profile>("/profile");
    return response.data;
};

/* =========================================
   SKILLS
   ========================================= */

export const getSkills = async (): Promise<Skill[]> => {
    const response = await api.get<Skill[]>("/skills");
    return response.data;
};

/* =========================================
   EDUCATION
   ========================================= */

export const getEducation = async (): Promise<Education[]> => {
    const response = await api.get<Education[]>("/education");
    return response.data;
};

/* =========================================
   CERTIFICATES
   ========================================= */

export const getCertificates = async (): Promise<Certificate[]> => {
    const response = await api.get<Certificate[]>("/certificates");
    return response.data;
};