import {
    useState,
    type FormEvent,
} from "react";

import { X } from "lucide-react";

import type {
    Experience,
    ExperienceRequest,
} from "../../types/Experience";

interface ExperienceFormProps {
    experience?: Experience | null;
    onSubmit: (
        data: ExperienceRequest
    ) => Promise<void>;
    onClose: () => void;
}

function ExperienceForm({
                            experience,
                            onSubmit,
                            onClose,
                        }: ExperienceFormProps) {
    const [company, setCompany] = useState(
        experience?.company ?? ""
    );

    const [position, setPosition] = useState(
        experience?.position ?? ""
    );

    const [location, setLocation] = useState(
        experience?.location ?? ""
    );

    const [description, setDescription] = useState(
        experience?.description ?? ""
    );

    const [startDate, setStartDate] = useState(
        experience?.startDate ?? ""
    );

    const [endDate, setEndDate] = useState(
        experience?.endDate ?? ""
    );

    const [currentlyWorking, setCurrentlyWorking] =
        useState(
            experience?.currentlyWorking ?? false
        );

    const [technologies, setTechnologies] = useState(
        experience?.technologies ?? ""
    );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isEditing = Boolean(experience);

    const handleCurrentlyWorkingChange = (
        checked: boolean
    ) => {
        setCurrentlyWorking(checked);

        if (checked) {
            setEndDate("");
        }
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        if (!startDate) {
            setError("Start date is required.");
            return;
        }

        if (
            !currentlyWorking &&
            !endDate
        ) {
            setError(
                "End date is required when you are not currently working here."
            );
            return;
        }

        if (
            !currentlyWorking &&
            endDate < startDate
        ) {
            setError(
                "End date cannot be before start date."
            );
            return;
        }

        setLoading(true);

        try {
            await onSubmit({
                company: company.trim(),
                position: position.trim(),
                location:
                    location.trim() || undefined,
                description:
                    description.trim() || undefined,
                startDate,
                endDate:
                    currentlyWorking
                        ? undefined
                        : endDate || undefined,
                currentlyWorking,
                technologies:
                    technologies.trim() || undefined,
            });

            onClose();
        } catch (error) {
            console.error(
                "Failed to save experience:",
                error
            );

            setError(
                "Failed to save experience. Please check the form and try again."
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
                                ? "Edit Experience"
                                : "Add Experience"}
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            {isEditing
                                ? "Update your professional experience."
                                : "Add a professional experience to your portfolio."}
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
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="experience-company"
                                className="mb-2 block text-sm font-medium text-zinc-300"
                            >
                                Company
                            </label>

                            <input
                                id="experience-company"
                                type="text"
                                value={company}
                                onChange={(event) =>
                                    setCompany(
                                        event.target.value
                                    )
                                }
                                placeholder="Google"
                                required
                                maxLength={150}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="experience-position"
                                className="mb-2 block text-sm font-medium text-zinc-300"
                            >
                                Position
                            </label>

                            <input
                                id="experience-position"
                                type="text"
                                value={position}
                                onChange={(event) =>
                                    setPosition(
                                        event.target.value
                                    )
                                }
                                placeholder="Software Engineer"
                                required
                                maxLength={150}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="experience-location"
                            className="mb-2 block text-sm font-medium text-zinc-300"
                        >
                            Location
                        </label>

                        <input
                            id="experience-location"
                            type="text"
                            value={location}
                            onChange={(event) =>
                                setLocation(
                                    event.target.value
                                )
                            }
                            placeholder="Bangalore, India"
                            maxLength={150}
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="experience-start-date"
                                className="mb-2 block text-sm font-medium text-zinc-300"
                            >
                                Start Date
                            </label>

                            <input
                                id="experience-start-date"
                                type="date"
                                value={startDate}
                                onChange={(event) =>
                                    setStartDate(
                                        event.target.value
                                    )
                                }
                                required
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none focus:border-zinc-600"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="experience-end-date"
                                className="mb-2 block text-sm font-medium text-zinc-300"
                            >
                                End Date
                            </label>

                            <input
                                id="experience-end-date"
                                type="date"
                                value={endDate}
                                onChange={(event) =>
                                    setEndDate(
                                        event.target.value
                                    )
                                }
                                disabled={
                                    currentlyWorking
                                }
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600 disabled:cursor-not-allowed disabled:opacity-40 focus:border-zinc-600"
                            />
                        </div>
                    </div>

                    <label className="flex cursor-pointer items-center gap-3">
                        <input
                            type="checkbox"
                            checked={currentlyWorking}
                            onChange={(event) =>
                                handleCurrentlyWorkingChange(
                                    event.target.checked
                                )
                            }
                            className="h-4 w-4 rounded border-zinc-700 bg-zinc-900"
                        />

                        <div>
                            <span className="text-sm text-zinc-300">
                                I currently work here
                            </span>

                            <p className="mt-0.5 text-xs text-zinc-600">
                                End date will be cleared automatically.
                            </p>
                        </div>
                    </label>

                    <div>
                        <label
                            htmlFor="experience-description"
                            className="mb-2 block text-sm font-medium text-zinc-300"
                        >
                            Description
                        </label>

                        <textarea
                            id="experience-description"
                            value={description}
                            onChange={(event) =>
                                setDescription(
                                    event.target.value
                                )
                            }
                            placeholder="Describe your responsibilities, achievements, and work..."
                            maxLength={5000}
                            rows={5}
                            className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="experience-technologies"
                            className="mb-2 block text-sm font-medium text-zinc-300"
                        >
                            Technologies
                        </label>

                        <input
                            id="experience-technologies"
                            type="text"
                            value={technologies}
                            onChange={(event) =>
                                setTechnologies(
                                    event.target.value
                                )
                            }
                            placeholder="Java, Spring Boot, MySQL, React"
                            maxLength={2000}
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                        />

                        <p className="mt-1.5 text-xs text-zinc-600">
                            Separate technologies with commas.
                        </p>
                    </div>

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
                                    ? "Update Experience"
                                    : "Create Experience"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ExperienceForm;