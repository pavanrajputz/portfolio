import {
    useState,
    type FormEvent,
} from "react";

import { X } from "lucide-react";

import type {
    Skill,
    SkillRequest,
} from "../../types/Skill";

interface SkillFormProps {
    skill?: Skill | null;
    onSubmit: (
        data: SkillRequest
    ) => Promise<void>;
    onClose: () => void;
}

function SkillForm({
                       skill,
                       onSubmit,
                       onClose,
                   }: SkillFormProps) {
    const [name, setName] =
        useState(
            skill?.name ?? ""
        );

    const [category, setCategory] =
        useState(
            skill?.category ?? ""
        );

    const [proficiency, setProficiency] =
        useState(
            skill?.proficiency ?? 0
        );

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const isEditing =
        Boolean(skill);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        const trimmedName =
            name.trim();

        const trimmedCategory =
            category.trim();

        if (!trimmedName) {
            setError(
                "Skill name is required."
            );
            return;
        }

        if (!trimmedCategory) {
            setError(
                "Category is required."
            );
            return;
        }

        if (
            proficiency < 0 ||
            proficiency > 100
        ) {
            setError(
                "Proficiency must be between 0 and 100."
            );
            return;
        }

        setLoading(true);

        try {
            await onSubmit({
                name: trimmedName,
                category: trimmedCategory,
                proficiency,
            });

            onClose();
        } catch (error) {
            console.error(
                "Failed to save skill:",
                error
            );

            setError(
                "Failed to save skill. Please check the form and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
        <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
        <div>
            <h2 className="text-lg font-semibold">
        {isEditing
            ? "Edit Skill"
            : "Add Skill"}
    </h2>

    <p className="mt-1 text-sm text-zinc-500">
    {isEditing
        ? "Update your skill information."
        : "Add a skill to your portfolio."}
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
            htmlFor="skill-name"
    className="mb-2 block text-sm font-medium text-zinc-300"
        >
        Skill Name
    </label>

    <input
    id="skill-name"
    type="text"
    value={name}
    onChange={(event) =>
    setName(
        event.target.value
    )
}
    placeholder="Java"
    required
    maxLength={100}
    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
    />
    </div>

    <div>
    <label
        htmlFor="skill-category"
    className="mb-2 block text-sm font-medium text-zinc-300"
        >
        Category
        </label>

        <input
    id="skill-category"
    type="text"
    value={category}
    onChange={(event) =>
    setCategory(
        event.target.value
    )
}
    placeholder="Backend"
    required
    maxLength={100}
    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
    />
    </div>

    <div>
    <div className="mb-3 flex items-center justify-between">
    <label
        htmlFor="skill-proficiency"
    className="text-sm font-medium text-zinc-300"
        >
        Proficiency
        </label>

        <span className="text-sm font-medium text-zinc-300">
        {proficiency}%
        </span>
        </div>

        <input
    id="skill-proficiency"
    type="range"
    min="0"
    max="100"
    value={proficiency}
    onChange={(event) =>
    setProficiency(
        Number(
            event.target.value
        )
    )
}
    className="w-full accent-white"
    />

    <div className="mt-2 flex justify-between text-xs text-zinc-600">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
        </div>
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
            ? "Update Skill"
            : "Create Skill"}
    </button>
    </div>
    </form>
    </div>
    </div>
);
}

export default SkillForm;