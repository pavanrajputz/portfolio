import {
    useState,
    type FormEvent,
} from "react";

import {
    X,
    Activity as ActivityIcon,
} from "lucide-react";

import type {
    Activity,
    ActivityRequest,
} from "../../types/Activity";

interface ActivityFormProps {
    activity?: Activity | null;
    onSubmit: (
        data: ActivityRequest
    ) => Promise<void>;
    onClose: () => void;
}

function ActivityForm({
                          activity,
                          onSubmit,
                          onClose,
                      }: ActivityFormProps) {

    const [title, setTitle] = useState(
        activity?.title ?? ""
    );

    const [description, setDescription] =
        useState(
            activity?.description ?? ""
        );

    const [activityDate, setActivityDate] =
        useState(
            activity?.activityDate ?? ""
        );

    const [type, setType] = useState(
        activity?.type ?? ""
    );

    const [imageUrl, setImageUrl] =
        useState(
            activity?.imageUrl ?? ""
        );

    const [externalUrl, setExternalUrl] =
        useState(
            activity?.externalUrl ?? ""
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
                "Activity title is required."
            );
            return;
        }

        if (!activityDate) {
            setError(
                "Activity date is required."
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
                activityDate,
                type:
                    type.trim() ||
                    undefined,
                imageUrl:
                    imageUrl.trim() ||
                    undefined,
                externalUrl:
                    externalUrl.trim() ||
                    undefined,
            });

            onClose();
        } catch (error) {
            console.error(
                "Failed to save activity:",
                error
            );

            setError(
                "Failed to save activity. Please try again."
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

    <ActivityIcon
        size={18}
    className="text-zinc-400"
    />

    </div>

    <div>

    <h2 className="text-lg font-semibold">
    {activity
        ? "Edit Activity"
        : "Add Activity"}
    </h2>

    <p className="mt-1 text-xs text-zinc-500">
    {activity
        ? "Update activity information."
        : "Add a new activity to your portfolio."}
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
        Title
        </label>

        <input
    type="text"
    value={title}
    onChange={(event) =>
    setTitle(
        event.target.value
    )
}
    placeholder="Published a new project"
    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
        />

        </div>

    {/* Date + Type */}

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

    <div>

        <label className="mb-2 block text-sm font-medium text-zinc-300">
        Activity Date
    </label>

    <input
    type="date"
    value={
        activityDate
    }
    onChange={(
        event
    ) =>
    setActivityDate(
        event.target.value
    )
}
    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white outline-none focus:border-zinc-600"
    />

    </div>

    <div>

    <label className="mb-2 block text-sm font-medium text-zinc-300">
        Type
        </label>

        <input
    type="text"
    value={type}
    onChange={(
        event
    ) =>
    setType(
        event.target.value
    )
}
    placeholder="Project, Achievement, Learning"
    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
        />

        </div>

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
    rows={4}
    placeholder="Describe what happened..."
    className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm leading-6 text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
        />

        </div>

    {/* Image URL */}

    <div>

        <label className="mb-2 block text-sm font-medium text-zinc-300">
        Image URL
    </label>

    <input
    type="url"
    value={
        imageUrl
    }
    onChange={(
        event
    ) =>
    setImageUrl(
        event.target.value
    )
}
    placeholder="https://example.com/image.jpg"
    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
        />

        </div>

    {/* External URL */}

    <div>

        <label className="mb-2 block text-sm font-medium text-zinc-300">
        External URL
    </label>

    <input
    type="url"
    value={
        externalUrl
    }
    onChange={(
        event
    ) =>
    setExternalUrl(
        event.target.value
    )
}
    placeholder="https://github.com/..."
    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
    />

    <p className="mt-2 text-xs text-zinc-600">
        Optional link to the related project, post, certificate, or page.
    </p>

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
        : activity
            ? "Update Activity"
            : "Add Activity"}
    </button>

    </div>

    </form>

    </div>

    </div>
);
}

export default ActivityForm;