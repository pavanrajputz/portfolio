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
    GraduationCap,
} from "lucide-react";

import {
    createEducation,
    deleteEducation,
    getEducations,
    updateEducation,
} from "../../services/EducationService";

import type {
    Education as EducationType,
    EducationRequest,
} from "../../types/Education";

import EducationForm from "../../components/forms/EducationForm";

function Education() {
    const [educations, setEducations] =
        useState<EducationType[]>([]);

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

    const [editingEducation, setEditingEducation] =
        useState<EducationType | null>(null);

    const [deletingId, setDeletingId] =
        useState<number | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadEducations = async () => {
            try {
                const data =
                    await getEducations();

                if (cancelled) {
                    return;
                }

                setEducations(data);
                setError(null);
            } catch (error) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Failed to load education:",
                    error
                );

                setError(
                    "Failed to load education."
                );
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void loadEducations();

        return () => {
            cancelled = true;
        };
    }, []);

    const filteredEducations = useMemo(() => {
        const normalizedSearch =
            search.trim().toLowerCase();

        return educations.filter(
            (education) => {
                const matchesSearch =
                    normalizedSearch === "" ||
                    education.institution
                        .toLowerCase()
                        .includes(
                            normalizedSearch
                        ) ||
                    education.degree
                        .toLowerCase()
                        .includes(
                            normalizedSearch
                        ) ||
                    (
                        education.fieldOfStudy ??
                        ""
                    )
                        .toLowerCase()
                        .includes(
                            normalizedSearch
                        ) ||
                    (
                        education.location ??
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
                        education.currentlyStudying
                    ) ||
                    (
                        filter ===
                        "completed" &&
                        !education.currentlyStudying
                    );

                return (
                    matchesSearch &&
                    matchesFilter
                );
            }
        );
    }, [
        educations,
        search,
        filter,
    ]);

    const handleCreate = async (
        data: EducationRequest
    ) => {
        const createdEducation =
            await createEducation(data);

        setEducations((current) => [
            createdEducation,
            ...current,
        ]);
    };

    const handleUpdate = async (
        data: EducationRequest
    ) => {
        if (!editingEducation) {
            return;
        }

        const updatedEducation =
            await updateEducation(
                editingEducation.id,
                data
            );

        setEducations((current) =>
            current.map((education) =>
                education.id ===
                updatedEducation.id
                    ? updatedEducation
                    : education
            )
        );
    };

    const handleDelete = async (
        id: number
    ) => {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this education record?"
            );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(id);

            await deleteEducation(id);

            setEducations((current) =>
                current.filter(
                    (education) =>
                        education.id !== id
                )
            );
        } catch (error) {
            console.error(
                "Failed to delete education:",
                error
            );

            setError(
                "Failed to delete education."
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
                await getEducations();

            setEducations(data);
        } catch (error) {
            console.error(
                "Failed to load education:",
                error
            );

            setError(
                "Failed to load education."
            );
        } finally {
            setLoading(false);
        }
    };

    const openCreateForm = () => {
        setEditingEducation(null);
        setShowForm(true);
    };

    const openEditForm = (
        education: EducationType
    ) => {
        setEditingEducation(
            education
        );
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingEducation(null);
    };

    const handleFormSubmit = async (
        data: EducationRequest
    ) => {
        if (editingEducation) {
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
                    Loading education...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Education
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        Manage the educational background displayed on your portfolio.
                    </p>
                </div>

                <button
                    onClick={
                        openCreateForm
                    }
                    className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                    <Plus size={17} />
                    Add Education
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
                        placeholder="Search education..."
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
                        All Education
                    </option>

                    <option value="current">
                        Currently Studying
                    </option>

                    <option value="completed">
                        Completed
                    </option>
                </select>
            </div>

            {educations.length === 0 && (
                <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-zinc-800">
                    <div className="text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                            <GraduationCap
                                size={20}
                                className="text-zinc-500"
                            />
                        </div>

                        <h2 className="mt-4 text-lg font-medium">
                            No education yet
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Add your educational background.
                        </p>

                        <button
                            onClick={
                                openCreateForm
                            }
                            className="mt-5 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:opacity-90"
                        >
                            Add Education
                        </button>
                    </div>
                </div>
            )}

            {educations.length > 0 &&
                filteredEducations.length === 0 && (
                    <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-zinc-800">
                        <div className="text-center">
                            <h2 className="text-lg font-medium">
                                No matching education
                            </h2>

                            <p className="mt-2 text-sm text-zinc-500">
                                Try changing your search or filter.
                            </p>
                        </div>
                    </div>
                )}

            {filteredEducations.length > 0 && (
                <div className="space-y-5">
                    {filteredEducations.map(
                        (education) => (
                            <div
                                key={
                                    education.id
                                }
                                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
                            >
                                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="text-xl font-medium">
                                                {
                                                    education.degree
                                                }
                                            </h2>

                                            {education.currentlyStudying && (
                                                <span className="rounded-md border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-xs text-emerald-400">
                                                    Current
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-2 text-sm font-medium text-zinc-300">
                                            {
                                                education.institution
                                            }
                                        </p>

                                        {education.fieldOfStudy && (
                                            <p className="mt-1 text-sm text-zinc-500">
                                                {
                                                    education.fieldOfStudy
                                                }
                                            </p>
                                        )}

                                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-500">
                                            {education.location && (
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin
                                                        size={
                                                            14
                                                        }
                                                    />
                                                    {
                                                        education.location
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
                                                    education.startDate
                                                )}

                                                {" — "}

                                                {education.currentlyStudying
                                                    ? "Present"
                                                    : education.endDate
                                                        ? formatDate(
                                                            education.endDate
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
                                                    education
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
                                                    education.id
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                education.id
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

                                <div className="mt-5 flex flex-wrap gap-3">
                                    {education.grade && (
                                        <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-xs text-zinc-400">
                                            Grade:{" "}
                                            {
                                                education.grade
                                            }
                                        </span>
                                    )}
                                </div>

                                {education.description && (
                                    <p className="mt-5 max-w-4xl text-sm leading-6 text-zinc-500">
                                        {
                                            education.description
                                        }
                                    </p>
                                )}

                                <div className="mt-6 border-t border-zinc-800 pt-4">
                                    <span className="text-xs text-zinc-600">
                                        Updated{" "}
                                        {new Date(
                                            education.updatedAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}

            {showForm && (
                <EducationForm
                    education={
                        editingEducation
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

export default Education;