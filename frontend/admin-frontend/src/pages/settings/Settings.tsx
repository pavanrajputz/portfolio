import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Plus,
    Search,
    Pencil,
    Trash2,
    Settings2,
    Globe2,
    Lock,
} from "lucide-react";

import {
    createSetting,
    deleteSetting,
    getSettings,
    updateSetting,
} from "../../services/SettingService";

import type {
    Setting,
    SettingRequest,
} from "../../types/Setting";

import SettingForm from "../../components/forms/SettingForm";

function Settings() {

    const [settings, setSettings] =
        useState<Setting[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [search, setSearch] =
        useState("");

    const [visibilityFilter, setVisibilityFilter] =
        useState<
            "all" | "public" | "private"
        >("all");

    const [showForm, setShowForm] =
        useState(false);

    const [editingSetting, setEditingSetting] =
        useState<Setting | null>(null);

    const [deletingId, setDeletingId] =
        useState<number | null>(null);

    useEffect(() => {

        let cancelled = false;

        const loadSettings =
            async () => {

                try {

                    const data =
                        await getSettings();

                    if (cancelled) {
                        return;
                    }

                    setSettings(data);
                    setError(null);

                } catch (error) {

                    if (cancelled) {
                        return;
                    }

                    console.error(
                        "Failed to load settings:",
                        error
                    );

                    setError(
                        "Failed to load settings."
                    );

                } finally {

                    if (!cancelled) {
                        setLoading(false);
                    }

                }
            };

        void loadSettings();

        return () => {
            cancelled = true;
        };

    }, []);

    const filteredSettings =
        useMemo(() => {

            const normalizedSearch =
                search
                    .trim()
                    .toLowerCase();

            return settings.filter(
                (setting) => {

                    const matchesSearch =
                        normalizedSearch === "" ||
                        setting.settingKey
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||
                        (
                            setting.settingValue ??
                            ""
                        )
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||
                        (
                            setting.description ??
                            ""
                        )
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            );

                    const matchesVisibility =
                        visibilityFilter ===
                        "all" ||
                        (
                            visibilityFilter ===
                            "public" &&
                            setting.isPublic
                        ) ||
                        (
                            visibilityFilter ===
                            "private" &&
                            !setting.isPublic
                        );

                    return (
                        matchesSearch &&
                        matchesVisibility
                    );
                }
            );

        }, [
            settings,
            search,
            visibilityFilter,
        ]);

    const handleCreate = async (
        data: SettingRequest
    ) => {

        const createdSetting =
            await createSetting(data);

        setSettings((current) => [
            createdSetting,
            ...current,
        ]);

    };

    const handleUpdate = async (
        data: SettingRequest
    ) => {

        if (!editingSetting) {
            return;
        }

        const updatedSetting =
            await updateSetting(
                editingSetting.id,
                data
            );

        setSettings((current) =>
            current.map(
                (setting) =>
                    setting.id ===
                    updatedSetting.id
                        ? updatedSetting
                        : setting
            )
        );

    };

    const handleDelete = async (
        id: number
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this setting?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setDeletingId(id);

            await deleteSetting(id);

            setSettings((current) =>
                current.filter(
                    (setting) =>
                        setting.id !== id
                )
            );

        } catch (error) {

            console.error(
                "Failed to delete setting:",
                error
            );

            setError(
                "Failed to delete setting."
            );

        } finally {

            setDeletingId(null);

        }

    };

    const handleRetry = async () => {

        try {

            setError(null);
            setLoading(true);

            const data =
                await getSettings();

            setSettings(data);

        } catch (error) {

            console.error(
                "Failed to load settings:",
                error
            );

            setError(
                "Failed to load settings."
            );

        } finally {

            setLoading(false);

        }

    };

    const openCreateForm = () => {
        setEditingSetting(null);
        setShowForm(true);
    };

    const openEditForm = (
        setting: Setting
    ) => {
        setEditingSetting(setting);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingSetting(null);
    };

    const handleFormSubmit = async (
        data: SettingRequest
    ) => {

        if (editingSetting) {
            await handleUpdate(data);
        } else {
            await handleCreate(data);
        }

    };

    if (loading) {

        return (
            <div className="flex min-h-[400px] items-center justify-center">

                <p className="text-sm text-zinc-500">
                    Loading settings...
                </p>

            </div>
        );

    }

    return (
        <div className="space-y-8">

            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-3xl font-semibold tracking-tight">
                        Settings
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        Manage the configuration values used by your portfolio.
                    </p>

                </div>

                <button
                    onClick={
                        openCreateForm
                    }
                    className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                    <Plus size={17} />
                    Add Setting
                </button>

            </div>

            {/* Error */}

            {error && (
                <div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">

                    <p className="text-sm text-red-400">
                        {error}
                    </p>

                    <button
                        onClick={
                            handleRetry
                        }
                        className="text-sm text-zinc-300 underline underline-offset-4 hover:text-white"
                    >
                        Retry
                    </button>

                </div>
            )}

            {/* Filters */}

            <div className="flex flex-col gap-3 lg:flex-row">

                <div className="relative flex-1">

                    <Search
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(
                            event
                        ) =>
                            setSearch(
                                event.target.value
                            )
                        }
                        placeholder="Search settings..."
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900/40 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                    />

                </div>

                <select
                    value={
                        visibilityFilter
                    }
                    onChange={(
                        event
                    ) =>
                        setVisibilityFilter(
                            event.target
                                .value as
                                | "all"
                                | "public"
                                | "private"
                        )
                    }
                    className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-2.5 text-sm text-zinc-300 outline-none focus:border-zinc-600"
                >

                    <option
                        value="all"
                        className="bg-zinc-900"
                    >
                        All Settings
                    </option>

                    <option
                        value="public"
                        className="bg-zinc-900"
                    >
                        Public
                    </option>

                    <option
                        value="private"
                        className="bg-zinc-900"
                    >
                        Private
                    </option>

                </select>

            </div>

            {/* Empty */}

            {settings.length === 0 && (
                <div className="flex min-h-[350px] items-center justify-center rounded-xl border border-dashed border-zinc-800">

                    <div className="text-center">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">

                            <Settings2
                                size={20}
                                className="text-zinc-500"
                            />

                        </div>

                        <h2 className="mt-4 text-lg font-medium">
                            No settings yet
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Add your first portfolio setting.
                        </p>

                        <button
                            onClick={
                                openCreateForm
                            }
                            className="mt-5 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:opacity-90"
                        >
                            Add Setting
                        </button>

                    </div>

                </div>
            )}

            {/* No Results */}

            {settings.length > 0 &&
                filteredSettings.length ===
                0 && (
                    <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-zinc-800">

                        <div className="text-center">

                            <h2 className="text-lg font-medium">
                                No matching settings
                            </h2>

                            <p className="mt-2 text-sm text-zinc-500">
                                Try changing your search or filter.
                            </p>

                        </div>

                    </div>
                )}

            {/* Settings */}

            {filteredSettings.length >
                0 && (
                    <div className="overflow-hidden rounded-xl border border-zinc-800">

                        <div className="hidden grid-cols-[1.2fr_1.5fr_120px_100px_100px] gap-4 border-b border-zinc-800 bg-zinc-900/60 px-5 py-3 text-xs font-medium uppercase tracking-wider text-zinc-600 md:grid">

                        <span>
                            Key
                        </span>

                            <span>
                            Value
                        </span>

                            <span>
                            Type
                        </span>

                            <span>
                            Visibility
                        </span>

                            <span className="text-right">
                            Actions
                        </span>

                        </div>

                        <div className="divide-y divide-zinc-800">

                            {filteredSettings.map(
                                (setting) => {

                                    const isDeleting =
                                        deletingId ===
                                        setting.id;

                                    return (
                                        <div
                                            key={
                                                setting.id
                                            }
                                            className="grid grid-cols-1 gap-4 px-5 py-5 transition-colors hover:bg-zinc-900/30 md:grid-cols-[1.2fr_1.5fr_120px_100px_100px] md:items-center"
                                        >

                                            {/* Key */}

                                            <div className="min-w-0">

                                                <p className="break-all font-mono text-sm text-zinc-200">
                                                    {
                                                        setting.settingKey
                                                    }
                                                </p>

                                                {setting.description && (
                                                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-600">
                                                        {
                                                            setting.description
                                                        }
                                                    </p>
                                                )}

                                            </div>

                                            {/* Value */}

                                            <div className="min-w-0">

                                                <p className="line-clamp-2 break-all text-sm text-zinc-400">
                                                    {
                                                        setting.settingValue ||
                                                        "—"
                                                    }
                                                </p>

                                            </div>

                                            {/* Type */}

                                            <div>

                                            <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-500">
                                                {
                                                    setting.type ||
                                                    "text"
                                                }
                                            </span>

                                            </div>

                                            {/* Visibility */}

                                            <div>

                                                {setting.isPublic ? (
                                                    <span className="flex items-center gap-1.5 text-xs text-emerald-400">

                                                    <Globe2
                                                        size={
                                                            14
                                                        }
                                                    />

                                                    Public

                                                </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 text-xs text-zinc-500">

                                                    <Lock
                                                        size={
                                                            14
                                                        }
                                                    />

                                                    Private

                                                </span>
                                                )}

                                            </div>

                                            {/* Actions */}

                                            <div className="flex items-center justify-start gap-1 md:justify-end">

                                                <button
                                                    onClick={() =>
                                                        openEditForm(
                                                            setting
                                                        )
                                                    }
                                                    className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
                                                    title="Edit"
                                                >
                                                    <Pencil
                                                        size={
                                                            16
                                                        }
                                                    />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            setting.id
                                                        )
                                                    }
                                                    disabled={
                                                        isDeleting
                                                    }
                                                    className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <Trash2
                                                        size={
                                                            16
                                                        }
                                                    />
                                                </button>

                                            </div>

                                        </div>
                                    );
                                }
                            )}

                        </div>

                    </div>
                )}

            {/* Form */}

            {showForm && (
                <SettingForm
                    setting={
                        editingSetting
                    }
                    onSubmit={
                        handleFormSubmit
                    }
                    onClose={
                        closeForm
                    }
                />
            )}

        </div>
    );
}

export default Settings;