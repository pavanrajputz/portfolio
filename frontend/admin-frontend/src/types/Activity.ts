export interface Activity {
    id: number;
    title: string;
    description: string | null;
    activityDate: string;
    type: string | null;
    imageUrl: string | null;
    externalUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ActivityRequest {
    title: string;
    description?: string;
    activityDate: string;
    type?: string;
    imageUrl?: string;
    externalUrl?: string;
}