export interface Certificate {
    id: number;
    title: string;
    issuer: string;
    issueDate: string;
    expiryDate: string | null;
    description: string | null;
    certificateImageUrl: string | null;
    credentialId: string | null;
    credentialUrl: string | null;
    createdAt: string;
    updatedAt: string;
}