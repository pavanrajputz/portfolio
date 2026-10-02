import api from "./api";

import type {
    Message,
} from "../types/Message";

const MESSAGE_API =
    "/api/admin/messages";

export const getMessages = async (): Promise<Message[]> => {
    const response =
        await api.get<Message[]>(
            MESSAGE_API
        );

    return response.data;
};

export const getMessageById = async (
    id: number
): Promise<Message> => {
    const response =
        await api.get<Message>(
            `${MESSAGE_API}/${id}`
        );

    return response.data;
};

export const markMessageAsRead =
    async (
        id: number
    ): Promise<Message> => {

        const response =
            await api.patch<Message>(
                `${MESSAGE_API}/${id}/read`
            );

        return response.data;
    };

export const deleteMessage = async (
    id: number
): Promise<void> => {

    await api.delete(
        `${MESSAGE_API}/${id}`
    );
};