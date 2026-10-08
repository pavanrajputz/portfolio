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