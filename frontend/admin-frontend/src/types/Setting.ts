export interface Setting {
    id: number;
    settingKey: string;
    settingValue: string | null;
    type: string | null;
    description: string | null;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface SettingRequest {
    settingKey: string;
    settingValue?: string;
    type?: string;
    description?: string;
    isPublic: boolean;
}