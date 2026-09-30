import api from "./api";
import type {LoginRequest, LoginResponse} from "../types/Auth"

const AUTH_API = "/api/auth";

export const login = async (
    credentials: LoginRequest
): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
        `${AUTH_API}/login`,
        credentials
    );

    return response.data;
};