export interface Experience {
    id: number;
    company: string;
    position: string;
    location: string | null;
    description: string | null;
    startDate: string;
    endDate: string | null;
    technologies: string | null;
    currentlyWorking: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ExperienceRequest {
    company: string;
    position: string;
    location?: string;
    description?: string;
    startDate: string;
    endDate?: string;
    currentlyWorking: boolean;
    technologies?: string;
}