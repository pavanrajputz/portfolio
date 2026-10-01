import {
    useState,
    type FormEvent,
} from "react";

import { X } from "lucide-react";

import type {
    Education,
    EducationRequest,
} from "../../types/Education";

interface EducationFormProps {
    education?: Education | null;
    onSubmit: (
        data: EducationRequest
    ) => Promise<void>;
    onClose: () => void;
}

function EducationForm({
                           education,
                           onSubmit,
                           onClose,
                       }: EducationFormProps) {
    const [institution, setInstitution] =
        useState(
            education?.institution ?? ""
        );

    const [degree, setDegree] =
        useState(
            education?.degree ?? ""
        );

    const [fieldOfStudy, setFieldOfStudy] =
        useState(
            education?.fieldOfStudy ?? ""
        );

    const [location, setLocation] =
        useState(
            education?.location ?? ""
        );

    const [startDate, setStartDate] =
        useState(
            education?.startDate ?? ""
        );

    const [endDate, setEndDate] =
        useState(
            education?.endDate ?? ""
        );

    const [currentlyStudying, setCurrentlyStudying] =
        useState(
            education?.currentlyStudying ?? false
        );

    const [description, setDescription] =
        useState(
            education?.description ?? ""
        );

    const [grade, setGrade] =
        useState(
            education?.grade ?? ""
        );

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const isEditing =
        Boolean(education);

    const handleCurrentlyStudyingChange = (
        checked: boolean
    ) => {
        setCurrentlyStudying(checked);

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
            setError(
                "Start date is required."
            );
            return;
        }

        if (
            !currentlyStudying &&
            !endDate
        ) {
            setError(
                "End date is required when you are not currently studying."
            );
            return;
        }

        if (
            !currentlyStudying &&
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
                institution:
                    institution.trim(),

                degree:
                    degree.trim(),

                fieldOfStudy:
                    fieldOfStudy.trim() ||
                    undefined,

                description:
                    description.trim() ||
                    undefined,

                grade:
                    grade.trim() ||
                    undefined,

                currentlyStudying,

                location:
                    location.trim() ||
                    undefined,

                startDate,

                endDate:
                    currentlyStudying
                        ? undefined
                        : endDate ||
                        undefined,
            });

            onClose();
        } catch (error) {
            console.error(
                "Failed to save education:",
                error
            );

            setError(
                "Failed to save education. Please check the form and try again."
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
                                ? "Edit Education"
                                : "Add Education"}
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            {isEditing
                                ? "Update your educational background."
                                : "Add an educational qualification to your portfolio."}
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
                            htmlFor="education-institution"
                            className="mb-2 block text-sm font-medium text-zinc-300"
                        >
                            Institution
                        </label>

                        <input
                            id="education-institution"
                            type="text"
                            value={institution}
                            onChange={(event) =>
                                setInstitution(
                                    event.target.value
                                )
                            }
                            placeholder="University / College"
                            required
                            maxLength={200}
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="education-degree"
                                className="mb-2 block text-sm font-medium text-zinc-300"
                            >
                                Degree
                            </label>

                            <input
                                id="education-degree"
                                type="text"
                                value={degree}
                                onChange={(event) =>
                                    setDegree(
                                        event.target.value
                                    )
                                }
                                placeholder="Bachelor of Technology"
                                required
                                maxLength={150}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="education-field"
                                className="mb-2 block text-sm font-medium text-zinc-300"
                            >
                                Field of Study
                            </label>

                            <input
                                id="education-field"
                                type="text"
                                value={fieldOfStudy}
                                onChange={(event) =>
                                    setFieldOfStudy(
                                        event.target.value
                                    )
                                }
                                placeholder="Computer Science"
                                maxLength={150}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="education-location"
                            className="mb-2 block text-sm font-medium text-zinc-300"
                        >
                            Location
                        </label>

                        <input
                            id="education-location"
                            type="text"
                            value={location}
                            onChange={(event) =>
                                setLocation(
                                    event.target.value
                                )
                            }
                            placeholder="Delhi, India"
                            maxLength={150}
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="education-start-date"
                                className="mb-2 block text-sm font-medium text-zinc-300"
                            >
                                Start Date
                            </label>

                            <input
                                id="education-start-date"
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
                                htmlFor="education-end-date"
                                className="mb-2 block text-sm font-medium text-zinc-300"
                            >
                                End Date
                            </label>

                            <input
                                id="education-end-date"
                                type="date"
                                value={endDate}
                                onChange={(event) =>
                                    setEndDate(
                                        event.target.value
                                    )
                                }
                                disabled={
                                    currentlyStudying
                                }
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none disabled:cursor-not-allowed disabled:opacity-40 focus:border-zinc-600"
                            />
                        </div>
                    </div>

                    <label className="flex cursor-pointer items-center gap-3">
                        <input
                            type="checkbox"
                            checked={
                                currentlyStudying
                            }
                            onChange={(event) =>
                                handleCurrentlyStudyingChange(
                                    event.target.checked
                                )
                            }
                            className="h-4 w-4 rounded border-zinc-700 bg-zinc-900"
                        />

                        <div>
                            <span className="text-sm text-zinc-300">
                                I am currently studying here
                            </span>

                            <p className="mt-0.5 text-xs text-zinc-600">
                                End date will be cleared automatically.
                            </p>
                        </div>
                    </label>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="education-grade"
                                className="mb-2 block text-sm font-medium text-zinc-300"
                            >
                                Grade
                            </label>

                            <input
                                id="education-grade"
                                type="text"
                                value={grade}
                                onChange={(event) =>
                                    setGrade(
                                        event.target.value
                                    )
                                }
                                placeholder="8.5 CGPA"
                                maxLength={100}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="education-description"
                            className="mb-2 block text-sm font-medium text-zinc-300"
                        >
                            Description
                        </label>

                        <textarea
                            id="education-description"
                            value={description}
                            onChange={(event) =>
                                setDescription(
                                    event.target.value
                                )
                            }
                            placeholder="Describe your studies, achievements, coursework, etc..."
                            maxLength={5000}
                            rows={5}
                            className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                        />
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
                                    ? "Update Education"
                                    : "Create Education"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EducationForm;