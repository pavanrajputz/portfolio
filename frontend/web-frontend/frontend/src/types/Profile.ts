export interface Profile {
    id: number;
    name: string;
    headline: string | null;
    bio: string | null;
    profileImageUrl: string | null;
    email: string | null;
    phone: string | null;
    location: string | null;
    resumeUrl: string | null;
    createdAt: string;
    updatedAt: string;
}