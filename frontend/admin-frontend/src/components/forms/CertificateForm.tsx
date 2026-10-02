import {
    useState,
    type FormEvent,
} from "react";

import { X } from "lucide-react";

import type {
    Certificate,
    CertificateRequest,
} from "../../types/Certificate";

interface CertificateFormProps {
    certificate?: Certificate | null;
    onSubmit: (
        data: CertificateRequest
    ) => Promise<void>;
    onClose: () => void;
}

function CertificateForm({
                             certificate,
                             onSubmit,
                             onClose,
                         }: CertificateFormProps) {
    const [title, setTitle] =
        useState(
            certificate?.title ?? ""
        );

    const [issuer, setIssuer] =
        useState(
            certificate?.issuer ?? ""
        );

    const [issueDate, setIssueDate] =
        useState(
            certificate?.issueDate ?? ""
        );

    const [expiryDate, setExpiryDate] =
        useState(
            certificate?.expiryDate ?? ""
        );

    const [credentialId, setCredentialId] =
        useState(
            certificate?.credentialId ?? ""
        );

    const [credentialUrl, setCredentialUrl] =
        useState(
            certificate?.credentialUrl ?? ""
        );

    const [description, setDescription] =
        useState(
            certificate?.description ?? ""
        );

    const [certificateImageUrl, setCertificateImageUrl] =
        useState(
            certificate?.certificateImageUrl ?? ""
        );

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const isEditing =
        Boolean(certificate);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        if (!issueDate) {
            setError(
                "Issue date is required."
            );
            return;
        }

        if (
            expiryDate &&
            expiryDate < issueDate
        ) {
            setError(
                "Expiry date cannot be before issue date."
            );
            return;
        }

        setLoading(true);

        try {
            await onSubmit({
                title: title.trim(),
                issuer: issuer.trim(),
                issueDate,
                expiryDate:
                    expiryDate || undefined,
                credentialId:
                    credentialId.trim() ||
                    undefined,
                credentialUrl:
                    credentialUrl.trim() ||
                    undefined,
                description:
                    description.trim() ||
                    undefined,
                certificateImageUrl:
                    certificateImageUrl.trim() ||
                    undefined,
            });

            onClose();
        } catch (error) {
            console.error(
                "Failed to save certificate:",
                error
            );

            setError(
                "Failed to save certificate. Please check the form and try again."
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
            ? "Edit Certificate"
            : "Add Certificate"}
    </h2>

    <p className="mt-1 text-sm text-zinc-500">
    {isEditing
        ? "Update your certificate details."
        : "Add a certificate to your portfolio."}
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
            htmlFor="certificate-title"
    className="mb-2 block text-sm font-medium text-zinc-300"
        >
        Certificate Title
    </label>

    <input
    id="certificate-title"
    type="text"
    value={title}
    onChange={(event) =>
    setTitle(
        event.target.value
    )
}
    placeholder="Java Programming Certification"
    required
    maxLength={200}
    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
    />
    </div>

    <div>
    <label
        htmlFor="certificate-issuer"
    className="mb-2 block text-sm font-medium text-zinc-300"
        >
        Issuer
        </label>

        <input
    id="certificate-issuer"
    type="text"
    value={issuer}
    onChange={(event) =>
    setIssuer(
        event.target.value
    )
}
    placeholder="Oracle"
    required
    maxLength={200}
    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
        />
        </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
    <div>
        <label
            htmlFor="certificate-issue-date"
    className="mb-2 block text-sm font-medium text-zinc-300"
        >
        Issue Date
    </label>

    <input
    id="certificate-issue-date"
    type="date"
    value={issueDate}
    onChange={(event) =>
    setIssueDate(
        event.target.value
    )
}
    required
    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none focus:border-zinc-600"
    />
    </div>

    <div>
    <label
        htmlFor="certificate-expiry-date"
    className="mb-2 block text-sm font-medium text-zinc-300"
        >
        Expiry Date
    </label>

    <input
    id="certificate-expiry-date"
    type="date"
    value={expiryDate}
    min={issueDate || undefined}
    onChange={(event) =>
    setExpiryDate(
        event.target.value
    )
}
    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none focus:border-zinc-600"
    />

    <p className="mt-1.5 text-xs text-zinc-600">
        Leave empty if the certificate does not expire.
    </p>
    </div>
    </div>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
    <div>
        <label
            htmlFor="certificate-credential-id"
    className="mb-2 block text-sm font-medium text-zinc-300"
        >
        Credential ID
    </label>

    <input
    id="certificate-credential-id"
    type="text"
    value={credentialId}
    onChange={(event) =>
    setCredentialId(
        event.target.value
    )
}
    placeholder="ABC123XYZ"
    maxLength={200}
    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
    />
    </div>

    <div>
    <label
        htmlFor="certificate-credential-url"
    className="mb-2 block text-sm font-medium text-zinc-300"
        >
        Credential URL
    </label>

    <input
    id="certificate-credential-url"
    type="url"
    value={credentialUrl}
    onChange={(event) =>
    setCredentialUrl(
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
        htmlFor="certificate-image"
    className="mb-2 block text-sm font-medium text-zinc-300"
        >
        Certificate Image URL
    </label>

    <input
    id="certificate-image"
    type="url"
    value={
        certificateImageUrl
    }
    onChange={(event) =>
    setCertificateImageUrl(
        event.target.value
    )
}
    placeholder="https://..."
    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
    />
    </div>

    <div>
    <label
        htmlFor="certificate-description"
    className="mb-2 block text-sm font-medium text-zinc-300"
        >
        Description
        </label>

        <textarea
    id="certificate-description"
    value={description}
    onChange={(event) =>
    setDescription(
        event.target.value
    )
}
    placeholder="Describe what this certificate represents..."
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
            ? "Update Certificate"
            : "Create Certificate"}
    </button>
    </div>
    </form>
    </div>
    </div>
);
}

export default CertificateForm;