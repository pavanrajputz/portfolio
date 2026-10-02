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
    Activity as ActivityIcon,
    ExternalLink,
    CalendarDays,
} from "lucide-react";

import {
    createActivity,
    deleteActivity,
    getActivities,
    updateActivity,
} from "../../services/ActivityService";

import type {
    Activity as ActivityType,
    ActivityRequest,
} from "../../types/Activity";

import ActivityForm from "../../components/forms/ActivityForm";

function Activity() {

    const [activities, setActivities] =
        useState<ActivityType[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [search, setSearch] =
        useState("");

    const [typeFilter, setTypeFilter] =
        useState("all");

    const [showForm, setShowForm] =
        useState(false);

    const [editingActivity, setEditingActivity] =
        useState<ActivityType | null>(null);

    const [deletingId, setDeletingId] =
        useState<number | null>(null);

    useEffect(() => {

        let cancelled = false;

        const loadActivities =
            async () => {

                try {

                    const data =
                        await getActivities();

                    if (cancelled) {
                        return;
                    }

                    setActivities(data);
                    setError(null);

                } catch (error) {

                    if (cancelled) {
                        return;
                    }

                    console.error(
                        "Failed to load activities:",
                        error
                    );

                    setError(
                        "Failed to load activities."
                    );

                } finally {

                    if (!cancelled) {
                        setLoading(false);
                    }

                }
            };

        void loadActivities();

        return () => {
            cancelled = true;
        };

    }, []);

    const activityTypes =
        useMemo(() => {

            const types =
                activities
                    .map(
                        (activity) =>
                            activity.type
                    )
                    .filter(
                        (
                            type
                        ): type is string =>
                            Boolean(type)
                    );

            return Array.from(
                new Set(types)
            ).sort();

        }, [activities]);

    const filteredActivities =
        useMemo(() => {

            const normalizedSearch =
                search
                    .trim()
                    .toLowerCase();

            return activities.filter(
                (activity) => {

                    const matchesSearch =
                        normalizedSearch === "" ||
                        activity.title
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||
                        (
                            activity.description ??
                            ""
                        )
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||
                        (
                            activity.type ??
                            ""
                        )
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            );

                    const matchesType =
                        typeFilter ===
                        "all" ||
                        activity.type ===
                        typeFilter;

                    return (
                        matchesSearch &&
                        matchesType
                    );
                }
            );

        }, [
            activities,
            search,
            typeFilter,
        ]);

    const handleCreate = async (
        data: ActivityRequest
    ) => {

        const createdActivity =
            await createActivity(data);

        setActivities((current) => [
            createdActivity,
            ...current,
        ]);

    };

    const handleUpdate = async (
        data: ActivityRequest
    ) => {

        if (!editingActivity) {
            return;
        }

        const updatedActivity =
            await updateActivity(
                editingActivity.id,
                data
            );

        setActivities((current) =>
            current.map(
                (activity) =>
                    activity.id ===
                    updatedActivity.id
                        ? updatedActivity
                        : activity
            )
        );

    };

    const handleDelete = async (
        id: number
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this activity?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setDeletingId(id);

            await deleteActivity(id);

            setActivities((current) =>
                current.filter(
                    (activity) =>
                        activity.id !== id
                )
            );

        } catch (error) {

            console.error(
                "Failed to delete activity:",
                error
            );

            setError(
                "Failed to delete activity."
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
                await getActivities();

            setActivities(data);

        } catch (error) {

            console.error(
                "Failed to load activities:",
                error
            );

            setError(
                "Failed to load activities."
            );

        } finally {

            setLoading(false);

        }

    };

    const openCreateForm = () => {
        setEditingActivity(null);
        setShowForm(true);
    };

    const openEditForm = (
        activity: ActivityType
    ) => {
        setEditingActivity(activity);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingActivity(null);
    };

    const handleFormSubmit = async (
        data: ActivityRequest
    ) => {

        if (editingActivity) {
            await handleUpdate(data);
        } else {
            await handleCreate(data);
        }

    };

    const formatDate = (
        date: string
    ) => {

        return new Date(
            `${date}T00:00:00`
        ).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );

    };

    if (loading) {

        return (
            <div className="flex min-h-[400px] items-center justify-center">

                <p className="text-sm text-zinc-500">
                    Loading activities...
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
                        Activity
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        Manage the activity timeline displayed on your portfolio.
                    </p>

                </div>

                <button
                    onClick={
                        openCreateForm
                    }
                    className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                    <Plus size={17} />
                    Add Activity
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
                                event.target
                                    .value
                            )
                        }
                        placeholder="Search activities..."
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900/40 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                    />

                </div>

                <select
                    value={typeFilter}
                    onChange={(
                        event
                    ) =>
                        setTypeFilter(
                            event.target
                                .value
                        )
                    }
                    className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-2.5 text-sm text-zinc-300 outline-none focus:border-zinc-600"
                >

                    <option
                        value="all"
                        className="bg-zinc-900"
                    >
                        All Types
                    </option>

                    {activityTypes.map(
                        (type) => (
                            <option
                                key={type}
                                value={type}
                                className="bg-zinc-900"
                            >
                                {type}
                            </option>
                        )
                    )}

                </select>

            </div>

            {/* Empty */}

            {activities.length === 0 && (
                <div className="flex min-h-[350px] items-center justify-center rounded-xl border border-dashed border-zinc-800">

                    <div className="text-center">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">

                            <ActivityIcon
                                size={20}
                                className="text-zinc-500"
                            />

                        </div>

                        <h2 className="mt-4 text-lg font-medium">
                            No activities yet
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Add your first activity to your portfolio.
                        </p>

                        <button
                            onClick={
                                openCreateForm
                            }
                            className="mt-5 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:opacity-90"
                        >
                            Add Activity
                        </button>

                    </div>

                </div>
            )}

            {/* No Results */}

            {activities.length > 0 &&
                filteredActivities.length ===
                0 && (
                    <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-zinc-800">

                        <div className="text-center">

                            <h2 className="text-lg font-medium">
                                No matching activities
                            </h2>

                            <p className="mt-2 text-sm text-zinc-500">
                                Try changing your search or filter.
                            </p>

                        </div>

                    </div>
                )}

            {/* Activity Timeline */}

            {filteredActivities.length >
                0 && (
                    <div className="relative">

                        {/* Timeline line */}

                        <div className="absolute left-[15px] top-5 bottom-5 hidden w-px bg-zinc-800 md:block" />

                        <div className="space-y-6">

                            {filteredActivities.map(
                                (activity) => {

                                    const isDeleting =
                                        deletingId ===
                                        activity.id;

                                    return (
                                        <div
                                            key={
                                                activity.id
                                            }
                                            className="relative md:pl-12"
                                        >

                                            {/* Timeline dot */}

                                            <div className="absolute left-[8px] top-6 hidden h-[15px] w-[15px] rounded-full border-4 border-zinc-950 bg-zinc-600 md:block" />

                                            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">

                                                {/* Image */}

                                                {activity.imageUrl && (
                                                    <div className="h-48 overflow-hidden border-b border-zinc-800 bg-zinc-900">

                                                        <img
                                                            src={
                                                                activity.imageUrl
                                                            }
                                                            alt={
                                                                activity.title
                                                            }
                                                            className="h-full w-full object-cover"
                                                        />

                                                    </div>
                                                )}

                                                <div className="p-5">

                                                    {/* Top */}

                                                    <div className="flex items-start justify-between gap-4">

                                                        <div className="min-w-0">

                                                            <div className="flex flex-wrap items-center gap-2">

                                                                <h2 className="text-lg font-medium">
                                                                    {
                                                                        activity.title
                                                                    }
                                                                </h2>

                                                                {activity.type && (
                                                                    <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-400">
                                                                    {
                                                                        activity.type
                                                                    }
                                                                </span>
                                                                )}

                                                            </div>

                                                            <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-600">

                                                                <CalendarDays
                                                                    size={
                                                                        14
                                                                    }
                                                                />

                                                                {
                                                                    formatDate(
                                                                        activity.activityDate
                                                                    )
                                                                }

                                                            </div>

                                                        </div>

                                                        <div className="flex shrink-0 items-center gap-1">

                                                            <button
                                                                onClick={() =>
                                                                    openEditForm(
                                                                        activity
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
                                                                        activity.id
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

                                                    {/* Description */}

                                                    {activity.description && (
                                                        <p className="mt-5 max-w-3xl text-sm leading-6 text-zinc-500">
                                                            {
                                                                activity.description
                                                            }
                                                        </p>
                                                    )}

                                                    {/* Footer */}

                                                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-4">

                                                    <span className="text-xs text-zinc-600">
                                                        Updated{" "}
                                                        {new Date(
                                                            activity.updatedAt
                                                        ).toLocaleDateString()}
                                                    </span>

                                                        {activity.externalUrl && (
                                                            <a
                                                                href={
                                                                    activity.externalUrl
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                                                            >
                                                                View Activity
                                                                <ExternalLink
                                                                    size={
                                                                        14
                                                                    }
                                                                />
                                                            </a>
                                                        )}

                                                    </div>

                                                </div>

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
                <ActivityForm
                    activity={
                        editingActivity
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

export default Activity;