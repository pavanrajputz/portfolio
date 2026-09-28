import {
    Plus,
    Search,
    MoreHorizontal,
    ExternalLink,
    Pencil,
    Trash2,
    Star,
} from "lucide-react";

const projects = [
    {
        id: 1,
        name: "Portfolio",
        description: "Personal developer portfolio and admin management system.",
        technologies: ["React", "TypeScript", "Spring Boot"],
        status: "Published",
        featured: true,
        updatedAt: "2 hours ago",
    },
    {
        id: 2,
        name: "iLearn",
        description: "Learning management platform built with Spring Boot.",
        technologies: ["Java", "Spring Boot", "MySQL"],
        status: "Published",
        featured: true,
        updatedAt: "Yesterday",
    },
    {
        id: 3,
        name: "Secure Vault",
        description: "Secure application for managing passwords and documents.",
        technologies: ["Java", "Android", "Room"],
        status: "Draft",
        featured: false,
        updatedAt: "3 days ago",
    },
];

function Projects() {
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
                    className="flex items-center justify-center gap-2 rounded-lg
          bg-white px-4 py-2.5 text-sm font-medium text-black
          transition-opacity hover:opacity-90"
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
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                    />

                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full rounded-lg border border-zinc-800
            bg-zinc-900/40 py-2.5 pl-10 pr-4 text-sm text-white
            outline-none placeholder:text-zinc-600
            focus:border-zinc-600"
                    />
                </div>

                {/* Filter */}
                <select
                    defaultValue="all"
                    className="rounded-lg border border-zinc-800
          bg-zinc-900/40 px-4 py-2.5 text-sm text-zinc-300
          outline-none focus:border-zinc-600"
                >
                    <option value="all">All Projects</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="featured">Featured</option>
                </select>

            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="group overflow-hidden rounded-xl border
            border-zinc-800 bg-zinc-900/40"
                    >

                        {/* Project Preview */}
                        <div className="relative flex h-48 items-center justify-center bg-zinc-900">

              <span className="text-sm text-zinc-600">
                Project Preview
              </span>

                            {/* Featured */}
                            {project.featured && (
                                <div
                                    className="absolute left-4 top-4 flex items-center
                  gap-1.5 rounded-md border border-zinc-700
                  bg-zinc-950/80 px-2.5 py-1.5 text-xs text-zinc-300"
                                >
                                    <Star size={12} />
                                    Featured
                                </div>
                            )}

                            {/* Status */}
                            <span
                                className={`absolute right-4 top-4 rounded-md px-2.5 py-1.5
                text-xs ${
                                    project.status === "Published"
                                        ? "bg-emerald-500/10 text-emerald-400"
                                        : "bg-amber-500/10 text-amber-400"
                                }`}
                            >
                {project.status}
              </span>

                        </div>

                        {/* Project Information */}
                        <div className="p-5">

                            <div className="flex items-start justify-between gap-4">

                                <div>
                                    <h2 className="text-lg font-medium">
                                        {project.name}
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                                        {project.description}
                                    </p>
                                </div>

                                <button
                                    className="rounded-lg p-2 text-zinc-500
                  hover:bg-zinc-800 hover:text-white"
                                >
                                    <MoreHorizontal size={18} />
                                </button>

                            </div>

                            {/* Technologies */}
                            <div className="mt-5 flex flex-wrap gap-2">
                                {project.technologies.map((technology) => (
                                    <span
                                        key={technology}
                                        className="rounded-md border border-zinc-800
                    bg-zinc-950 px-2.5 py-1 text-xs text-zinc-400"
                                    >
                    {technology}
                  </span>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">

                <span className="text-xs text-zinc-600">
                  Updated {project.updatedAt}
                </span>

                                <div className="flex items-center gap-1">

                                    <button
                                        className="rounded-lg p-2 text-zinc-500
                    hover:bg-zinc-800 hover:text-white"
                                        title="Preview"
                                    >
                                        <ExternalLink size={16} />
                                    </button>

                                    <button
                                        className="rounded-lg p-2 text-zinc-500
                    hover:bg-zinc-800 hover:text-white"
                                        title="Edit"
                                    >
                                        <Pencil size={16} />
                                    </button>

                                    <button
                                        className="rounded-lg p-2 text-zinc-500
                    hover:bg-red-500/10 hover:text-red-400"
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

        </div>
    );
}

export default Projects;