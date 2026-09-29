




export interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string | null;
    githubUrl: string | null;
    liveUrl: string | null;
    technologies: string;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectRequest {
    title: string;
    description: string;
    imageUrl?: string;
    githubUrl?: string;
    liveUrl?: string;
    technologies: string;
    featured: boolean;
}