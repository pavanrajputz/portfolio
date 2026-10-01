import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Plus,
    Search,
    MoreHorizontal,
    Pencil,
    Trash2,
    MapPin,
    CalendarDays,
    BriefcaseBusiness,
} from "lucide-react";

import {
    createExperience,
    deleteExperience,
    getExperiences,
    updateExperience,
} from "../../services/ExperienceService";

import type {
    Experience as ExperienceType,
    ExperienceRequest,
} from "../../types/Experience";

import ExperienceForm from "../../components/forms/ExperienceForm";

function Experience() {
    const [experiences, setExperiences] =
        useState<ExperienceType[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [search, setSearch] =
        useState("");

    const [filter, setFilter] =
        useState("all");

    const [showForm, setShowForm] =
        useState(false);

    const [editingExperience, setEditingExperience] =
        useState<ExperienceType | null>(null);

    const [deletingId, setDeletingId] =
        useState<number | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadExperiences = async () => {
            try {
                const data =
                    await getExperiences();

                if (cancelled) {
                    return;
                }

                setExperiences(data);
                setError(null);
            } catch (error) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Failed to load experiences:",
                    error
                );

                setError(
                    "Failed to load experiences."
                );
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void loadExperiences();

        return () => {
            cancelled = true;
        };
    }, []);

    const filteredExperiences = useMemo(() => {
        const normalizedSearch =
            search.trim().toLowerCase();

        return experiences.filter(
            (experience) => {
                const matchesSearch =
                    normalizedSearch === "" ||
                    experience.company
                        .toLowerCase()
                        .includes(
                            normalizedSearch
                        ) ||
                    experience.position
                        .toLowerCase()
                        .includes(
                            normalizedSearch
                        ) ||
                    (
                        experience.location ??
                        ""
                    )
                        .toLowerCase()
                        .includes(
                            normalizedSearch
                        ) ||
                    (
                        experience.technologies ??
                        ""
                    )
                        .toLowerCase()
                        .includes(
                            normalizedSearch
                        );

                const matchesFilter =
                    filter === "all" ||
                    (
                        filter ===
                        "current" &&
                        experience.currentlyWorking
                    ) ||
                    (
                        filter ===
                        "past" &&
                        !experience.currentlyWorking
                    );

                return (
                    matchesSearch &&
                    matchesFilter
                );
            }
        );
    }, [
        experiences,
        search,
        filter,
    ]);

    const handleCreate = async (
        data: ExperienceRequest
    ) => {
        const createdExperience =
            await createExperience(data);

        setExperiences((current) => [
            createdExperience,
            ...current,
        ]);
    };

    const handleUpdate = async (
        data: ExperienceRequest
    ) => {
        if (!editingExperience) {
            return;
        }

        const updatedExperience =
            await updateExperience(
                editingExperience.id,
                data
            );

        setExperiences((current) =>
            current.map((experience) =>
                experience.id ===
                updatedExperience.id
                    ? updatedExperience
                    : experience
            )
        );
    };

    const handleDelete = async (
        id: number
    ) => {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this experience?"
            );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(id);

            await deleteExperience(id);

            setExperiences((current) =>
                current.filter(
                    (experience) =>
                        experience.id !== id
                )
            );
        } catch (error) {
            console.error(
                "Failed to delete experience:",
                error
            );

            setError(
                "Failed to delete experience."
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
                await getExperiences();

            setExperiences(data);
        } catch (error) {
            console.error(
                "Failed to load experiences:",
                error
            );

            setError(
                "Failed to load experiences."
            );
        } finally {
            setLoading(false);
        }
    };

    const openCreateForm = () => {
        setEditingExperience(null);
        setShowForm(true);
    };

    const openEditForm = (
        experience: ExperienceType
    ) => {
        setEditingExperience(
            experience
        );
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingExperience(null);
    };

    const handleFormSubmit = async (
        data: ExperienceRequest
    ) => {
        if (editingExperience) {
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
                year: "numeric",
            }
        );
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-zinc-500">
                    Loading experience...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Experience
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        Manage the professional experience displayed on your portfolio.
                    </p>
                </div>

                <button
                    onClick={
                        openCreateForm
                    }
                    className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                    <Plus size={17} />
                    Add Experience
                </button>
            </div>

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

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                        placeholder="Search experience..."
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900/40 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                    />
                </div>

                <select
                    value={filter}
                    onChange={(event) =>
                        setFilter(
                            event.target.value
                        )
                    }
                    className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-2.5 text-sm text-zinc-300 outline-none focus:border-zinc-600"
                >
                    <option value="all">
                        All Experience
                    </option>

                    <option value="current">
                        Currently Working
                    </option>

                    <option value="past">
                        Past Experience
                    </option>
                </select>
            </div>

            {experiences.length === 0 && (
                <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-zinc-800">
                    <div className="text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                            <BriefcaseBusiness
                                size={20}
                                className="text-zinc-500"
                            />
                        </div>

                        <h2 className="mt-4 text-lg font-medium">
                            No experience yet
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Add your first professional experience.
                        </p>

                        <button
                            onClick={
                                openCreateForm
                            }
                            className="mt-5 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:opacity-90"
                        >
                            Add Experience
                        </button>
                    </div>
                </div>
            )}

            {experiences.length > 0 &&
                filteredExperiences.length === 0 && (
                    <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-zinc-800">
                        <div className="text-center">
                            <h2 className="text-lg font-medium">
                                No matching experience
                            </h2>

                            <p className="mt-2 text-sm text-zinc-500">
                                Try changing your search or filter.
                            </p>
                        </div>
                    </div>
                )}

            {filteredExperiences.length > 0 && (
                <div className="space-y-5">
                    {filteredExperiences.map(
                        (experience) => (
                            <div
                                key={
                                    experience.id
                                }
                                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
                            >
                                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="text-xl font-medium">
                                                {
                                                    experience.position
                                                }
                                            </h2>

                                            {experience.currentlyWorking && (
                                                <span className="rounded-md border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-xs text-emerald-400">
                                                    Current
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-2 text-sm font-medium text-zinc-300">
                                            {
                                                experience.company
                                            }
                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-500">
                                            {experience.location && (
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin
                                                        size={
                                                            14
                                                        }
                                                    />
                                                    {
                                                        experience.location
                                                    }
                                                </span>
                                            )}

                                            <span className="flex items-center gap-1.5">
                                                <CalendarDays
                                                    size={
                                                        14
                                                    }
                                                />

                                                {formatDate(
                                                    experience.startDate
                                                )}

                                                {" — "}

                                                {experience.currentlyWorking
                                                    ? "Present"
                                                    : experience.endDate
                                                        ? formatDate(
                                                            experience.endDate
                                                        )
                                                        : ""}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <button
                                            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-white"
                                            title="More"
                                        >
                                            <MoreHorizontal
                                                size={
                                                    18
                                                }
                                            />
                                        </button>

                                        <button
                                            onClick={() =>
                                                openEditForm(
                                                    experience
                                                )
                                            }
                                            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-white"
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
                                                    experience.id
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                experience.id
                                            }
                                            className="rounded-lg p-2 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
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

                                {experience.description && (
                                    <p className="mt-6 max-w-4xl text-sm leading-6 text-zinc-500">
                                        {
                                            experience.description
                                        }
                                    </p>
                                )}

                                {experience.technologies && (
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {experience.technologies
                                            .split(",")
                                            .map(
                                                (
                                                    technology
                                                ) =>
                                                    technology.trim()
                                            )
                                            .filter(
                                                Boolean
                                            )
                                            .map(
                                                (
                                                    technology
                                                ) => (
                                                    <span
                                                        key={
                                                            technology
                                                        }
                                                        className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-xs text-zinc-400"
                                                    >
                                                        {
                                                            technology
                                                        }
                                                    </span>
                                                )
                                            )}
                                    </div>
                                )}

                                <div className="mt-6 border-t border-zinc-800 pt-4">
                                    <span className="text-xs text-zinc-600">
                                        Updated{" "}
                                        {new Date(
                                            experience.updatedAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}

            {showForm && (
                <ExperienceForm
                    experience={
                        editingExperience
                    }
                    onSubmit={
                        handleFormSubmit
                    }
                    onClose={closeForm}
                />
            )}
        </div>
    );
}

export default Experience;