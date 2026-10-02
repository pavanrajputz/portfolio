import {
    useState,
    type FormEvent,
} from "react";

import {
    X,
    Settings2,
} from "lucide-react";

import type {
    Setting,
    SettingRequest,
} from "../../types/Setting";

interface SettingFormProps {
    setting?: Setting | null;
    onSubmit: (
        data: SettingRequest
    ) => Promise<void>;
    onClose: () => void;
}

function SettingForm({
                         setting,
                         onSubmit,
                         onClose,
                     }: SettingFormProps) {

    const [settingKey, setSettingKey] =
        useState(
            setting?.settingKey ?? ""
        );

    const [settingValue, setSettingValue] =
        useState(
            setting?.settingValue ?? ""
        );

    const [type, setType] =
        useState(
            setting?.type ?? ""
        );

    const [description, setDescription] =
        useState(
            setting?.description ?? ""
        );

    const [isPublic, setIsPublic] =
        useState(
            setting?.isPublic ?? true
        );

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        if (!settingKey.trim()) {
            setError(
                "Setting key is required."
            );
            return;
        }

        try {

            setSubmitting(true);
            setError(null);

            await onSubmit({
                settingKey:
                    settingKey.trim(),
                settingValue:
                    settingValue.trim() ||
                    undefined,
                type:
                    type.trim() ||
                    undefined,
                description:
                    description.trim() ||
                    undefined,
                isPublic,
            });

            onClose();

        } catch (error) {

            console.error(
                "Failed to save setting:",
                error
            );

            setError(
                "Failed to save setting. The key may already exist."
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

    <Settings2
        size={18}
    className="text-zinc-400"
    />

    </div>

    <div>

    <h2 className="text-lg font-semibold">
    {setting
        ? "Edit Setting"
        : "Add Setting"}
    </h2>

    <p className="mt-1 text-xs text-zinc-500">
    {setting
        ? "Update this portfolio setting."
        : "Create a new portfolio setting."}
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

    {/* Key */}

    <div>

        <label className="mb-2 block text-sm font-medium text-zinc-300">
        Setting Key
    </label>

    <input
    type="text"
    value={
        settingKey
    }
    onChange={(
        event
    ) =>
    setSettingKey(
        event.target.value
    )
}
    placeholder="site_title"
    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
    />

    <p className="mt-2 text-xs text-zinc-600">
        Use a unique key such as site_title, contact_email, or github_url.
    </p>

    </div>

    {/* Type */}

    <div>

        <label className="mb-2 block text-sm font-medium text-zinc-300">
        Type
        </label>

        <select
    value={type}
    onChange={(
        event
    ) =>
    setType(
        event.target.value
    )
}
    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white outline-none focus:border-zinc-600"
    >

    <option
        value=""
    className="bg-zinc-900"
        >
        Select type
    </option>

    <option
    value="text"
    className="bg-zinc-900"
        >
        Text
        </option>

        <option
    value="url"
    className="bg-zinc-900"
        >
        URL
        </option>

        <option
    value="email"
    className="bg-zinc-900"
        >
        Email
        </option>

        <option
    value="number"
    className="bg-zinc-900"
        >
        Number
        </option>

        <option
    value="boolean"
    className="bg-zinc-900"
        >
        Boolean
        </option>

        <option
    value="json"
    className="bg-zinc-900"
        >
        JSON
        </option>

        </select>

        </div>

    {/* Value */}

    <div>

        <label className="mb-2 block text-sm font-medium text-zinc-300">
        Setting Value
    </label>

    <textarea
    value={
        settingValue
    }
    onChange={(
        event
    ) =>
    setSettingValue(
        event.target.value
    )
}
    rows={4}
    placeholder="Enter setting value..."
    className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm leading-6 text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
        />

        </div>

    {/* Description */}

    <div>

        <label className="mb-2 block text-sm font-medium text-zinc-300">
        Description
        </label>

        <textarea
    value={
        description
    }
    onChange={(
        event
    ) =>
    setDescription(
        event.target.value
    )
}
    rows={3}
    placeholder="Explain what this setting controls..."
    className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm leading-6 text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
        />

        </div>

    {/* Public */}

    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">

    <label className="flex cursor-pointer items-start gap-3">

    <input
        type="checkbox"
    checked={
        isPublic
    }
    onChange={(
        event
    ) =>
    setIsPublic(
        event.target.checked
    )
}
    className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-900 accent-white"
    />

    <div>

        <p className="text-sm font-medium text-zinc-300">
        Public setting
    </p>

    <p className="mt-1 text-xs leading-5 text-zinc-600">
        Public settings can be exposed through the portfolio's public settings API.
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
    disabled={
        submitting
    }
    className="rounded-lg px-4 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white disabled:opacity-50"
        >
        Cancel
        </button>

        <button
    type="submit"
    disabled={
        submitting
    }
    className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
    {submitting
        ? "Saving..."
        : setting
            ? "Update Setting"
            : "Add Setting"}
    </button>

    </div>

    </form>

    </div>

    </div>
);
}

export default SettingForm;