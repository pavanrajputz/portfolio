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
    FileText,
    ExternalLink,
    CheckCircle2,
    Clock3,
} from "lucide-react";

import {
    createResume,
    deleteResume,
    getResumes,
    updateResume,
} from "../../services/ResumeService";

import type {
    Resume as ResumeType,
    ResumeRequest,
} from "../../types/Resume";

import ResumeForm from "../../components/forms/ResumeForm";

function Resume() {

    const [resumes, setResumes] =
        useState<ResumeType[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [search, setSearch] =
        useState("");

    const [showForm, setShowForm] =
        useState(false);

    const [editingResume, setEditingResume] =
        useState<ResumeType | null>(null);

    const [deletingId, setDeletingId] =
        useState<number | null>(null);

    useEffect(() => {

        let cancelled = false;

        const loadResumes = async () => {

            try {

                const data =
                    await getResumes();

                if (cancelled) {
                    return;
                }

                setResumes(data);
                setError(null);

            } catch (error) {

                if (cancelled) {
                    return;
                }

                console.error(
                    "Failed to load resumes:",
                    error
                );

                setError(
                    "Failed to load resumes."
                );

            } finally {

                if (!cancelled) {
                    setLoading(false);
                }

            }
        };

        void loadResumes();

        return () => {
            cancelled = true;
        };

    }, []);

    const filteredResumes = useMemo(() => {

        const normalizedSearch =
            search.trim().toLowerCase();

        return resumes.filter(
            (resume) =>
                normalizedSearch === "" ||
                resume.title
                    .toLowerCase()
                    .includes(
                        normalizedSearch
                    ) ||
                (
                    resume.version ?? ""
                )
                    .toLowerCase()
                    .includes(
                        normalizedSearch
                    ) ||
                (
                    resume.description ?? ""
                )
                    .toLowerCase()
                    .includes(
                        normalizedSearch
                    )
        );

    }, [resumes, search]);

    const activeResume = useMemo(
        () =>
            resumes.find(
                (resume) =>
                    resume.isActive
            ) ?? null,
        [resumes]
    );

    const otherResumes = useMemo(
        () =>
            filteredResumes.filter(
                (resume) =>
                    !resume.isActive
            ),
        [filteredResumes]
    );

    const handleCreate = async (
        data: ResumeRequest
    ) => {

        const createdResume =
            await createResume(data);

        setResumes((current) => {

            if (
                createdResume.isActive
            ) {
                return [
                    createdResume,
                    ...current.map(
                        (resume) => ({
                            ...resume,
                            isActive: false,
                        })
                    ),
                ];
            }

            return [
                createdResume,
                ...current,
            ];

        });

    };

    const handleUpdate = async (
        data: ResumeRequest
    ) => {

        if (!editingResume) {
            return;
        }

        const updatedResume =
            await updateResume(
                editingResume.id,
                data
            );

        setResumes((current) => {

            if (
                updatedResume.isActive
            ) {
                return current.map(
                    (resume) =>
                        resume.id ===
                        updatedResume.id
                            ? updatedResume
                            : {
                                ...resume,
                                isActive: false,
                            }
                );
            }

            return current.map(
                (resume) =>
                    resume.id ===
                    updatedResume.id
                        ? updatedResume
                        : resume
            );

        });

    };

    const handleDelete = async (
        id: number
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this resume?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setDeletingId(id);

            await deleteResume(id);

            setResumes((current) =>
                current.filter(
                    (resume) =>
                        resume.id !== id
                )
            );

        } catch (error) {

            console.error(
                "Failed to delete resume:",
                error
            );

            setError(
                "Failed to delete resume."
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
                await getResumes();

            setResumes(data);

        } catch (error) {

            console.error(
                "Failed to load resumes:",
                error
            );

            setError(
                "Failed to load resumes."
            );

        } finally {

            setLoading(false);

        }

    };

    const openCreateForm = () => {
        setEditingResume(null);
        setShowForm(true);
    };

    const openEditForm = (
        resume: ResumeType
    ) => {
        setEditingResume(resume);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingResume(null);
    };

    const handleFormSubmit = async (
        data: ResumeRequest
    ) => {

        if (editingResume) {
            await handleUpdate(data);
        } else {
            await handleCreate(data);
        }

    };

    const formatDate = (
        date: string
    ) => {

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );

    };

    const renderResumeCard = (
        resume: ResumeType,
        featured = false
    ) => {

        const isDeleting =
            deletingId === resume.id;

        return (
            <div
                key={resume.id}
                className={`rounded-xl border bg-zinc-900/40 ${
                    featured
                        ? "border-zinc-600"
                        : "border-zinc-800"
                }`}
            >

                <div className="p-6">

                    {/* Header */}

                    <div className="flex items-start justify-between gap-4">

                        <div className="flex min-w-0 items-start gap-4">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                                <FileText
                                    size={21}
                                    className="text-zinc-400"
                                />
                            </div>

                            <div className="min-w-0">

                                <div className="flex flex-wrap items-center gap-2">

                                    <h2 className="truncate text-lg font-medium">
                                        {resume.title}
                                    </h2>

                                    {resume.isActive && (
                                        <span className="flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/5 px-2 py-1 text-xs text-emerald-400">
                                            <CheckCircle2
                                                size={12}
                                            />
                                            Active
                                        </span>
                                    )}

                                </div>

                                {resume.version && (
                                    <p className="mt-1 text-sm text-zinc-500">
                                        Version{" "}
                                        {resume.version}
                                    </p>
                                )}

                            </div>

                        </div>

                        <div className="flex shrink-0 items-center gap-1">

                            <button
                                onClick={() =>
                                    openEditForm(
                                        resume
                                    )
                                }
                                className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
                                title="Edit"
                            >
                                <Pencil
                                    size={16}
                                />
                            </button>

                            <button
                                onClick={() =>
                                    handleDelete(
                                        resume.id
                                    )
                                }
                                disabled={
                                    isDeleting
                                }
                                className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                                title="Delete"
                            >
                                <Trash2
                                    size={16}
                                />
                            </button>

                        </div>

                    </div>

                    {/* Description */}

                    {resume.description && (
                        <p className="mt-5 text-sm leading-6 text-zinc-500">
                            {
                                resume.description
                            }
                        </p>
                    )}

                    {/* Metadata */}

                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-600">

                        <span className="flex items-center gap-1.5">
                            <Clock3
                                size={14}
                            />
                            Updated{" "}
                            {formatDate(
                                resume.updatedAt
                            )}
                        </span>

                        <span>
                            Created{" "}
                            {formatDate(
                                resume.createdAt
                            )}
                        </span>

                    </div>

                    {/* Actions */}

                    <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">

                        <span className="truncate pr-4 text-xs text-zinc-600">
                            {resume.fileUrl}
                        </span>

                        <a
                            href={
                                resume.fileUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                        >
                            View PDF
                            <ExternalLink
                                size={14}
                            />
                        </a>

                    </div>

                </div>

            </div>
        );
    };

    if (loading) {

        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-zinc-500">
                    Loading resumes...
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
                        Resume
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        Manage the resumes available on your portfolio.
                    </p>

                </div>

                <button
                    onClick={
                        openCreateForm
                    }
                    className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                    <Plus size={17} />
                    Add Resume
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

            {/* Search */}

            <div className="relative">

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
                    placeholder="Search resumes..."
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/40 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                />

            </div>

            {/* Empty */}

            {resumes.length === 0 && (
                <div className="flex min-h-[350px] items-center justify-center rounded-xl border border-dashed border-zinc-800">

                    <div className="text-center">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                            <FileText
                                size={20}
                                className="text-zinc-500"
                            />
                        </div>

                        <h2 className="mt-4 text-lg font-medium">
                            No resumes yet
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Add your first resume to your portfolio.
                        </p>

                        <button
                            onClick={
                                openCreateForm
                            }
                            className="mt-5 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:opacity-90"
                        >
                            Add Resume
                        </button>

                    </div>

                </div>
            )}

            {/* No Search Results */}

            {resumes.length > 0 &&
                filteredResumes.length === 0 && (
                    <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-zinc-800">

                        <div className="text-center">

                            <h2 className="text-lg font-medium">
                                No matching resumes
                            </h2>

                            <p className="mt-2 text-sm text-zinc-500">
                                Try changing your search.
                            </p>

                        </div>

                    </div>
                )}

            {/* Active Resume */}

            {activeResume &&
                filteredResumes.some(
                    (resume) =>
                        resume.id ===
                        activeResume.id
                ) && (
                    <section>

                        <div className="mb-4 flex items-center gap-2">

                            <CheckCircle2
                                size={16}
                                className="text-emerald-400"
                            />

                            <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
                                Active Resume
                            </h2>

                        </div>

                        {renderResumeCard(
                            activeResume,
                            true
                        )}

                    </section>
                )}

            {/* Other Resumes */}

            {otherResumes.length > 0 && (
                <section>

                    <div className="mb-4">

                        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
                            Other Resumes
                        </h2>

                    </div>

                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

                        {otherResumes.map(
                            (resume) =>
                                renderResumeCard(
                                    resume
                                )
                        )}

                    </div>

                </section>
            )}

            {/* Form */}

            {showForm && (
                <ResumeForm
                    resume={
                        editingResume
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

export default Resume;