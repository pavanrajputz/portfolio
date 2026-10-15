
import api from "./api";
import type { Profile, ProfileRequest } from "../types/profile";

const PROFILE_API = "/api/admin/profile";

export const getProfile = async (): Promise<Profile> => {
    const response = await api.get<Profile>(PROFILE_API);
    return response.data;
};

export const updateProfile = async (
    profile: ProfileRequest
): Promise<Profile> => {
    const response = await api.put<Profile>(PROFILE_API, profile);
    return response.data;
};
