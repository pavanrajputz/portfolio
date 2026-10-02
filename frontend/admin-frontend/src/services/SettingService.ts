import api from "./api";

import type {
    Setting,
    SettingRequest,
} from "../types/Setting";

const SETTING_API =
    "/api/admin/settings";

export const getSettings = async (): Promise<Setting[]> => {
    const response =
        await api.get<Setting[]>(
            SETTING_API
        );

    return response.data;
};

export const getSettingById = async (
    id: number
): Promise<Setting> => {
    const response =
        await api.get<Setting>(
            `${SETTING_API}/${id}`
        );

    return response.data;
};

export const getSettingByKey = async (
    key: string
): Promise<Setting> => {
    const response =
        await api.get<Setting>(
            `${SETTING_API}/key/${encodeURIComponent(key)}`
        );

    return response.data;
};

export const createSetting = async (
    setting: SettingRequest
): Promise<Setting> => {
    const response =
        await api.post<Setting>(
            SETTING_API,
            setting
        );

    return response.data;
};

export const updateSetting = async (
    id: number,
    setting: SettingRequest
): Promise<Setting> => {
    const response =
        await api.put<Setting>(
            `${SETTING_API}/${id}`,
            setting
        );

    return response.data;
};

export const deleteSetting = async (
    id: number
): Promise<void> => {
    await api.delete(
        `${SETTING_API}/${id}`
    );
};