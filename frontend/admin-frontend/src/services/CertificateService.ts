import api from "./api";

import type {
    Certificate,
    CertificateRequest,
} from "../types/Certificate";

const CERTIFICATE_API = "/api/admin/certificates";

export const getCertificates = async (): Promise<Certificate[]> => {
    const response = await api.get<Certificate[]>(
        CERTIFICATE_API
    );

    return response.data;
};

export const getCertificateById = async (
    id: number
): Promise<Certificate> => {
    const response = await api.get<Certificate>(
        `${CERTIFICATE_API}/${id}`
    );

    return response.data;
};

export const createCertificate = async (
    certificate: CertificateRequest
): Promise<Certificate> => {
    const response = await api.post<Certificate>(
        CERTIFICATE_API,
        certificate
    );

    return response.data;
};

export const updateCertificate = async (
    id: number,
    certificate: CertificateRequest
): Promise<Certificate> => {
    const response = await api.put<Certificate>(
        `${CERTIFICATE_API}/${id}`,
        certificate
    );

    return response.data;
};

export const deleteCertificate = async (
    id: number
): Promise<void> => {
    await api.delete(
        `${CERTIFICATE_API}/${id}`
    );
};