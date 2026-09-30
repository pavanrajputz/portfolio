import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";

import type {
    Project,
    ProjectRequest,
} from "../../types/Project";

interface ProjectFormProps {
    project?: Project | null;
    onSubmit: (data: ProjectRequest) => Promise<void>;
    onClose: () => void;
}

function ProjectForm({
                         project,
                         onSubmit,
                         onClose,
                     }: ProjectFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [featured, setFeatured] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isEditing = Boolean(project);

    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setDescription(project.description);
            setImageUrl(project.imageUrl ?? "");
            setGithubUrl(project.githubUrl ?? "");
            setLiveUrl(project.liveUrl ?? "");
            setTechnologies(project.technologies);
            setFeatured(project.featured);
        } else {
            setTitle("");
            setDescription("");
            setImageUrl("");
            setGithubUrl("");
            setLiveUrl("");
            setTechnologies("");
            setFeatured(false);
        }
    }, [project]);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await onSubmit({
                title: title.trim(),
                description: description.trim(),
                imageUrl: imageUrl.trim() || undefined,
                githubUrl: githubUrl.trim() || undefined,
                liveUrl: liveUrl.trim() || undefined,
                technologies: technologies.trim(),
                featured,
            });

            onClose();
        } catch (error) {
            console.error(
                "Failed to save project:",
                error
            );

            setError(
                "Failed to save project. Please check the form and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

                <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold">
                            {isEditing
                                ? "Edit Project"
                                : "Add Project"}
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            {isEditing
                                ? "Update your project details."
                                : "Add a new project to your portfolio."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-900 hover:text-white"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >
                    <div>
                        <label
                            htmlFor="project-title"
                            className="mb-2 block text-sm font-medium text-zinc-300"
                        >
                            Title
                        </label>

                        <input
                            id="project-title"
                            type="text"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            placeholder="Portfolio Website"
                            required
                            maxLength={150}
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="project-description"
                            className="mb-2 block text-sm font-medium text-zinc-300"
                        >
                            Description
                        </label>

                        <textarea
                            id="project-description"
                            value={description}
                            onChange={(event) =>
                                setDescription(
                                    event.target.value
                                )
                            }
                            placeholder="Describe the project..."
                            required
                            maxLength={500}
                            rows={4}
                            className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="project-technologies"
                            className="mb-2 block text-sm font-medium text-zinc-300"
                        >
                            Technologies
                        </label>

                        <input
                            id="project-technologies"
                            type="text"
                            value={technologies}
                            onChange={(event) =>
                                setTechnologies(
                                    event.target.value
                                )
                            }
                            placeholder="Java, Spring Boot, MySQL, React"
                            required
                            maxLength={1000}
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                        />

                        <p className="mt-1.5 text-xs text-zinc-600">
                            Separate technologies with commas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="project-github"
                                className="mb-2 block text-sm font-medium text-zinc-300"
                            >
                                GitHub URL
                            </label>

                            <input
                                id="project-github"
                                type="url"
                                value={githubUrl}
                                onChange={(event) =>
                                    setGithubUrl(
                                        event.target.value
                                    )
                                }
                                placeholder="https://github.com/..."
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="project-live"
                                className="mb-2 block text-sm font-medium text-zinc-300"
                            >
                                Live URL
                            </label>

                            <input
                                id="project-live"
                                type="url"
                                value={liveUrl}
                                onChange={(event) =>
                                    setLiveUrl(
                                        event.target.value
                                    )
                                }
                                placeholder="https://..."
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="project-image"
                            className="mb-2 block text-sm font-medium text-zinc-300"
                        >
                            Image URL
                        </label>

                        <input
                            id="project-image"
                            type="url"
                            value={imageUrl}
                            onChange={(event) =>
                                setImageUrl(
                                    event.target.value
                                )
                            }
                            placeholder="https://..."
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                        />
                    </div>

                    <label className="flex cursor-pointer items-center gap-3">
                        <input
                            type="checkbox"
                            checked={featured}
                            onChange={(event) =>
                                setFeatured(
                                    event.target.checked
                                )
                            }
                            className="h-4 w-4 rounded border-zinc-700 bg-zinc-900"
                        />

                        <span className="text-sm text-zinc-300">
                            Mark as featured project
                        </span>
                    </label>

                    {error && (
                        <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
                            <p className="text-sm text-red-400">
                                {error}
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 border-t border-zinc-800 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-lg border border-zinc-800 px-4 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Saving..."
                                : isEditing
                                    ? "Update Project"
                                    : "Create Project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProjectForm;