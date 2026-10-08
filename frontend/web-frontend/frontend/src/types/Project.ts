export interface Project {
    id: number;
    title: string;
    description: string | null;
    imageUrl: string | null;
    githubUrl: string | null;
    liveUrl: string | null;
    technologies: string | null;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}