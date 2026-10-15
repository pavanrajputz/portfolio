
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

export interface ProfileRequest {
    name: string;
    headline: string;
    bio: string;
    profileImageUrl: string;
    email: string;
    phone: string;
    location: string;
    resumeUrl: string;
}
