export interface Education {
    id: number;
    institution: string;
    degree: string;
    fieldOfStudy: string | null;
    description: string | null;
    grade: string | null;
    currentlyStudying: boolean;
    location: string | null;
    startDate: string;
    endDate: string | null;
    createdAt: string;
    updatedAt: string;
}