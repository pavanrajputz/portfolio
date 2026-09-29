import { useEffect, useState } from "react";

import {
    Plus,
    Search,
    MoreHorizontal,
    ExternalLink,
    Pencil,
    Trash2,
    Star,
} from "lucide-react";

import { getProjects } from "../../services/projectService";
import type { Project } from "../../types/Project.ts";

function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await getProjects();

                setProjects(data);
            } catch (error) {
                console.error("Failed to load projects:", error);

                setError("Failed to load projects.");
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-zinc-500">
                    Loading projects...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-red-400">
                    {error}
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
                        Projects
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        Manage the projects displayed on your portfolio.
                    </p>
                </div>

                <button
                    className="flex items-center justify-center gap-2
                    rounded-lg bg-white px-4 py-2.5 text-sm
                    font-medium text-black transition-opacity
                    hover:opacity-90"
                >
                    <Plus size={17} />

                    Add Project
                </button>

            </div>

            {/* Toolbar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                {/* Search */}
                <div className="relative flex-1">

                    <Search
                        size={17}
                        className="absolute left-3 top-1/2
                        -translate-y-1/2 text-zinc-600"
                    />

                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full rounded-lg border
                        border-zinc-800 bg-zinc-900/40
                        py-2.5 pl-10 pr-4 text-sm text-white
                        outline-none placeholder:text-zinc-600
                        focus:border-zinc-600"
                    />

                </div>

                {/* Filter */}
                <select
                    defaultValue="all"
                    className="rounded-lg border border-zinc-800
                    bg-zinc-900/40 px-4 py-2.5 text-sm
                    text-zinc-300 outline-none
                    focus:border-zinc-600"
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

            {/* Empty State */}
            {projects.length === 0 && (
                <div
                    className="flex min-h-[300px] items-center
                    justify-center rounded-xl border
                    border-dashed border-zinc-800"
                >
                    <div className="text-center">

                        <h2 className="text-lg font-medium">
                            No projects found
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Create your first project to display it here.
                        </p>

                    </div>
                </div>
            )}

            {/* Project Grid */}
            {projects.length > 0 && (
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

                    {projects.map((project) => (

                        <div
                            key={project.id}
                            className="group overflow-hidden
                            rounded-xl border border-zinc-800
                            bg-zinc-900/40"
                        >

                            {/* Project Preview */}
                            <div
                                className="relative flex h-48
                                items-center justify-center
                                bg-zinc-900"
                            >

                                {project.imageUrl ? (
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="h-full w-full
                                        object-cover"
                                    />
                                ) : (
                                    <span className="text-sm text-zinc-600">
                                        Project Preview
                                    </span>
                                )}

                                {/* Featured */}
                                {project.featured && (
                                    <div
                                        className="absolute left-4 top-4
                                        flex items-center gap-1.5
                                        rounded-md border
                                        border-zinc-700
                                        bg-zinc-950/80 px-2.5 py-1.5
                                        text-xs text-zinc-300"
                                    >
                                        <Star size={12} />

                                        Featured
                                    </div>
                                )}

                            </div>

                            {/* Project Information */}
                            <div className="p-5">

                                <div
                                    className="flex items-start
                                    justify-between gap-4"
                                >

                                    <div>

                                        <h2 className="text-lg font-medium">
                                            {project.title}
                                        </h2>

                                        <p
                                            className="mt-2 text-sm
                                            leading-6 text-zinc-500"
                                        >
                                            {project.description}
                                        </p>

                                    </div>

                                    <button
                                        className="rounded-lg p-2
                                        text-zinc-500
                                        hover:bg-zinc-800
                                        hover:text-white"
                                    >
                                        <MoreHorizontal size={18} />
                                    </button>

                                </div>

                                {/* Technologies */}
                                <div className="mt-5 flex flex-wrap gap-2">

                                    {project.technologies
                                        .split(",")
                                        .map((technology) =>
                                            technology.trim()
                                        )
                                        .filter(Boolean)
                                        .map((technology) => (

                                            <span
                                                key={technology}
                                                className="rounded-md
                                                border border-zinc-800
                                                bg-zinc-950 px-2.5 py-1
                                                text-xs text-zinc-400"
                                            >
                                                {technology}
                                            </span>

                                        ))}

                                </div>

                                {/* Footer */}
                                <div
                                    className="mt-6 flex items-center
                                    justify-between border-t
                                    border-zinc-800 pt-4"
                                >

                                    <span className="text-xs text-zinc-600">
                                        Updated{" "}
                                        {new Date(
                                            project.updatedAt
                                        ).toLocaleDateString()}
                                    </span>

                                    <div className="flex items-center gap-1">

                                        {/* Preview */}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-lg p-2
                                                text-zinc-500
                                                hover:bg-zinc-800
                                                hover:text-white"
                                                title="Preview"
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                        )}

                                        {/* GitHub */}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-lg p-2
                                                text-zinc-500
                                                hover:bg-zinc-800
                                                hover:text-white"
                                                title="GitHub"
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                        )}

                                        {/* Edit */}
                                        <button
                                            className="rounded-lg p-2
                                            text-zinc-500
                                            hover:bg-zinc-800
                                            hover:text-white"
                                            title="Edit"
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        {/* Delete */}
                                        <button
                                            className="rounded-lg p-2
                                            text-zinc-500
                                            hover:bg-red-500/10
                                            hover:text-red-400"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default Projects;