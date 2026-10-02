import api from "./api";

import type {
    Activity,
    ActivityRequest,
} from "../types/Activity";

const ACTIVITY_API =
    "/api/admin/activities";

export const getActivities = async (): Promise<Activity[]> => {
    const response =
        await api.get<Activity[]>(
            ACTIVITY_API
        );

    return response.data;
};

export const getActivityById = async (
    id: number
): Promise<Activity> => {
    const response =
        await api.get<Activity>(
            `${ACTIVITY_API}/${id}`
        );

    return response.data;
};

export const createActivity = async (
    activity: ActivityRequest
): Promise<Activity> => {
    const response =
        await api.post<Activity>(
            ACTIVITY_API,
            activity
        );

    return response.data;
};

export const updateActivity = async (
    id: number,
    activity: ActivityRequest
): Promise<Activity> => {
    const response =
        await api.put<Activity>(
            `${ACTIVITY_API}/${id}`,
            activity
        );

    return response.data;
};

export const deleteActivity = async (
    id: number
): Promise<void> => {
    await api.delete(
        `${ACTIVITY_API}/${id}`
    );
};