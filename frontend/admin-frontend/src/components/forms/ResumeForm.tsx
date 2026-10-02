import {
    useState,
    type FormEvent,
} from "react";

import {
    X,
    FileText,
} from "lucide-react";

import type {
    Resume,
    ResumeRequest,
} from "../../types/Resume";

interface ResumeFormProps {
    resume?: Resume | null;
    onSubmit: (
        data: ResumeRequest
    ) => Promise<void>;
    onClose: () => void;
}

function ResumeForm({
                        resume,
                        onSubmit,
                        onClose,
                    }: ResumeFormProps) {

    const [title, setTitle] = useState(
        resume?.title ?? ""
    );

    const [description, setDescription] =
        useState(
            resume?.description ?? ""
        );

    const [fileUrl, setFileUrl] =
        useState(
            resume?.fileUrl ?? ""
        );

    const [version, setVersion] =
        useState(
            resume?.version ?? ""
        );

    const [isActive, setIsActive] =
        useState(
            resume?.isActive ?? false
        );

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!title.trim()) {
            setError(
                "Resume title is required."
            );
            return;
        }

        if (!fileUrl.trim()) {
            setError(
                "Resume file URL is required."
            );
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            await onSubmit({
                title: title.trim(),
                description:
                    description.trim() ||
                    undefined,
                fileUrl: fileUrl.trim(),
                version:
                    version.trim() ||
                    undefined,
                isActive,
            });

            onClose();
        } catch (error) {
            console.error(
                "Failed to save resume:",
                error
            );

            setError(
                "Failed to save resume. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
                            <FileText
                                size={18}
                                className="text-zinc-400"
                            />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold">
                                {resume
                                    ? "Edit Resume"
                                    : "Add Resume"}
                            </h2>

                            <p className="mt-1 text-xs text-zinc-500">
                                {resume
                                    ? "Update resume information."
                                    : "Add a new resume to your portfolio."}
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-900 hover:text-white"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="max-h-[80vh] overflow-y-auto"
                >

                    <div className="space-y-5 px-6 py-6">

                        {error && (
                            <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
                                <p className="text-sm text-red-400">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Title */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300">
                                Resume Title
                            </label>

                            <input
                                type="text"
                                value={title}
                                onChange={(event) =>
                                    setTitle(
                                        event.target.value
                                    )
                                }
                                placeholder="Software Engineer Resume"
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                            />
                        </div>

                        {/* Version */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300">
                                Version
                            </label>

                            <input
                                type="text"
                                value={version}
                                onChange={(event) =>
                                    setVersion(
                                        event.target.value
                                    )
                                }
                                placeholder="v3.0"
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                            />
                        </div>

                        {/* File URL */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300">
                                Resume File URL
                            </label>

                            <input
                                type="url"
                                value={fileUrl}
                                onChange={(event) =>
                                    setFileUrl(
                                        event.target.value
                                    )
                                }
                                placeholder="https://example.com/resume.pdf"
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                            />

                            <p className="mt-2 text-xs text-zinc-600">
                                Provide the public URL of your PDF resume.
                            </p>
                        </div>

                        {/* Description */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300">
                                Description
                            </label>

                            <textarea
                                value={description}
                                onChange={(event) =>
                                    setDescription(
                                        event.target.value
                                    )
                                }
                                rows={4}
                                placeholder="Short description about this resume..."
                                className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm leading-6 text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                            />
                        </div>

                        {/* Active */}

                        <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">

                            <label className="flex cursor-pointer items-start gap-3">

                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={(event) =>
                                        setIsActive(
                                            event.target.checked
                                        )
                                    }
                                    className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-900 accent-white"
                                />

                                <div>
                                    <p className="text-sm font-medium text-zinc-300">
                                        Set as active resume
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-zinc-600">
                                        This resume will be displayed on your public portfolio. Any previously active resume will be deactivated automatically.
                                    </p>
                                </div>

                            </label>

                        </div>

                    </div>

                    {/* Footer */}

                    <div className="flex items-center justify-end gap-3 border-t border-zinc-800 px-6 py-4">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={submitting}
                            className="rounded-lg px-4 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {submitting
                                ? "Saving..."
                                : resume
                                    ? "Update Resume"
                                    : "Add Resume"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default ResumeForm;