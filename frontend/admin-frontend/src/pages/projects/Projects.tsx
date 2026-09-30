import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Plus,
    Search,
    MoreHorizontal,
    ExternalLink,
    Pencil,
    Trash2,
    Star,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

import {
    createProject,
    deleteProject,
    getProjects,
    updateProject,
} from "../../services/projectService";

import type {
    Project,
    ProjectRequest,
} from "../../types/Project";

import ProjectForm from "../../components/forms/ProjectForm";

function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] =
        useState<Project | null>(null);

    const [deletingId, setDeletingId] =
        useState<number | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadProjects = async () => {
            try {
                const data = await getProjects();

                if (cancelled) {
                    return;
                }

                setProjects(data);
                setError(null);
            } catch (error) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Failed to load projects:",
                    error
                );

                setError("Failed to load projects.");
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void loadProjects();

        return () => {
            cancelled = true;
        };
    }, []);

    const filteredProjects = useMemo(() => {
        const normalizedSearch =
            search.trim().toLowerCase();

        return projects.filter((project) => {
            const matchesSearch =
                normalizedSearch === "" ||
                project.title
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                project.description
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                project.technologies
                    .toLowerCase()
                    .includes(normalizedSearch);

            const matchesFilter =
                filter === "all" ||
                (filter === "featured" &&
                    project.featured) ||
                (filter === "non-featured" &&
                    !project.featured);

            return (
                matchesSearch &&
                matchesFilter
            );
        });
    }, [projects, search, filter]);

    const handleCreate = async (
        data: ProjectRequest
    ) => {
        const createdProject =
            await createProject(data);

        setProjects((current) => [
            createdProject,
            ...current,
        ]);
    };

    const handleUpdate = async (
        data: ProjectRequest
    ) => {
        if (!editingProject) {
            return;
        }

        const updatedProject =
            await updateProject(
                editingProject.id,
                data
            );

        setProjects((current) =>
            current.map((project) =>
                project.id === updatedProject.id
                    ? updatedProject
                    : project
            )
        );
    };

    const handleDelete = async (
        id: number
    ) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(id);

            await deleteProject(id);

            setProjects((current) =>
                current.filter(
                    (project) =>
                        project.id !== id
                )
            );
        } catch (error) {
            console.error(
                "Failed to delete project:",
                error
            );

            setError(
                "Failed to delete project."
            );
        } finally {
            setDeletingId(null);
        }
    };

    const handleRetry = async () => {
        try {
            setError(null);
            setLoading(true);

            const data = await getProjects();

            setProjects(data);
        } catch (error) {
            console.error(
                "Failed to load projects:",
                error
            );

            setError("Failed to load projects.");
        } finally {
            setLoading(false);
        }
    };

    const openCreateForm = () => {
        setEditingProject(null);
        setShowForm(true);
    };

    const openEditForm = (
        project: Project
    ) => {
        setEditingProject(project);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingProject(null);
    };

    const handleFormSubmit = async (
        data: ProjectRequest
    ) => {
        if (editingProject) {
            await handleUpdate(data);
        } else {
            await handleCreate(data);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-zinc-500">
                    Loading projects...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Projects
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        Manage the projects displayed on your portfolio.
                    </p>
                </div>

                <button
                    onClick={openCreateForm}
                    className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                    <Plus size={17} />
                    Add Project
                </button>
            </div>

            {error && (
                <div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
                    <p className="text-sm text-red-400">
                        {error}
                    </p>

                    <button
                        onClick={handleRetry}
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
                        placeholder="Search projects..."
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
                        All Projects
                    </option>

                    <option value="featured">
                        Featured
                    </option>

                    <option value="non-featured">
                        Not Featured
                    </option>
                </select>
            </div>

            {projects.length === 0 && (
                <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-zinc-800">
                    <div className="text-center">
                        <h2 className="text-lg font-medium">
                            No projects yet
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Create your first project to display it here.
                        </p>

                        <button
                            onClick={openCreateForm}
                            className="mt-5 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:opacity-90"
                        >
                            Add Project
                        </button>
                    </div>
                </div>
            )}

            {projects.length > 0 &&
                filteredProjects.length === 0 && (
                    <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-zinc-800">
                        <div className="text-center">
                            <h2 className="text-lg font-medium">
                                No matching projects
                            </h2>

                            <p className="mt-2 text-sm text-zinc-500">
                                Try changing your search or filter.
                            </p>
                        </div>
                    </div>
                )}

            {filteredProjects.length > 0 && (
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                    {filteredProjects.map(
                        (project) => (
                            <div
                                key={project.id}
                                className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40"
                            >
                                <div className="relative flex h-48 items-center justify-center bg-zinc-900">
                                    {project.imageUrl ? (
                                        <img
                                            src={
                                                project.imageUrl
                                            }
                                            alt={
                                                project.title
                                            }
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-sm text-zinc-600">
                                            Project Preview
                                        </span>
                                    )}

                                    {project.featured && (
                                        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-950/80 px-2.5 py-1.5 text-xs text-zinc-300">
                                            <Star
                                                size={12}
                                            />
                                            Featured
                                        </div>
                                    )}
                                </div>

                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <h2 className="text-lg font-medium">
                                                {
                                                    project.title
                                                }
                                            </h2>

                                            <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-500">
                                                {
                                                    project.description
                                                }
                                            </p>
                                        </div>

                                        <button
                                            className="shrink-0 rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-white"
                                            title="More"
                                        >
                                            <MoreHorizontal
                                                size={18}
                                            />
                                        </button>
                                    </div>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {project.technologies
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

                                    <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">
                                        <span className="text-xs text-zinc-600">
                                            Updated{" "}
                                            {new Date(
                                                project.updatedAt
                                            ).toLocaleDateString()}
                                        </span>

                                        <div className="flex items-center gap-1">
                                            {project.liveUrl && (
                                                <a
                                                    href={
                                                        project.liveUrl
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-white"
                                                    title="Live Preview"
                                                >
                                                    <ExternalLink
                                                        size={
                                                            16
                                                        }
                                                    />
                                                </a>
                                            )}

                                            {project.githubUrl && (
                                                <a
                                                    href={
                                                        project.githubUrl
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-white"
                                                    title="GitHub"
                                                >
                                                    <FaGithub
                                                        size={
                                                            16
                                                        }
                                                    />
                                                </a>
                                            )}

                                            <button
                                                onClick={() =>
                                                    openEditForm(
                                                        project
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
                                                        project.id
                                                    )
                                                }
                                                disabled={
                                                    deletingId ===
                                                    project.id
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
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}

            {showForm && (
                <ProjectForm
                    project={editingProject}
                    onSubmit={handleFormSubmit}
                    onClose={closeForm}
                />
            )}
        </div>
    );
}

export default Projects;