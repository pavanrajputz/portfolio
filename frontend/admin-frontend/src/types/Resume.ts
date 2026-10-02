export interface Resume {
    id: number;
    title: string;
    description: string | null;
    fileUrl: string;
    version: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ResumeRequest {
    title: string;
    description?: string;
    fileUrl: string;
    version?: string;
    isActive: boolean;
}