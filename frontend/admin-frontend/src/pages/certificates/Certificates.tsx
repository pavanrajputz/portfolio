import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Plus,
    Search,
    MoreHorizontal,
    Pencil,
    Trash2,
    Award,
    ExternalLink,
    CalendarDays,
} from "lucide-react";

import {
    createCertificate,
    deleteCertificate,
    getCertificates,
    updateCertificate,
} from "../../services/CertificateService";

import type {
    Certificate,
    CertificateRequest,
} from "../../types/Certificate";

import CertificateForm from "../../components/forms/CertificateForm";

function Certificates() {
    const [certificates, setCertificates] =
        useState<Certificate[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [search, setSearch] =
        useState("");

    const [showForm, setShowForm] =
        useState(false);

    const [editingCertificate, setEditingCertificate] =
        useState<Certificate | null>(null);

    const [deletingId, setDeletingId] =
        useState<number | null>(null);

    const [today] = useState(() => {
        const date = new Date();

        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0"),
        ].join("-");
    });

    useEffect(() => {
        let cancelled = false;

        const loadCertificates = async () => {
            try {
                const data =
                    await getCertificates();

                if (cancelled) {
                    return;
                }

                setCertificates(data);
                setError(null);
            } catch (error) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Failed to load certificates:",
                    error
                );

                setError(
                    "Failed to load certificates."
                );
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void loadCertificates();

        return () => {
            cancelled = true;
        };
    }, []);

    const filteredCertificates = useMemo(() => {
        const normalizedSearch =
            search.trim().toLowerCase();

        return certificates.filter(
            (certificate) => {
                return (
                    normalizedSearch === "" ||
                    certificate.title
                        .toLowerCase()
                        .includes(
                            normalizedSearch
                        ) ||
                    certificate.issuer
                        .toLowerCase()
                        .includes(
                            normalizedSearch
                        ) ||
                    (
                        certificate.credentialId ??
                        ""
                    )
                        .toLowerCase()
                        .includes(
                            normalizedSearch
                        )
                );
            }
        );
    }, [
        certificates,
        search,
    ]);

    const handleCreate = async (
        data: CertificateRequest
    ) => {
        const createdCertificate =
            await createCertificate(data);

        setCertificates((current) => [
            createdCertificate,
            ...current,
        ]);
    };

    const handleUpdate = async (
        data: CertificateRequest
    ) => {
        if (!editingCertificate) {
            return;
        }

        const updatedCertificate =
            await updateCertificate(
                editingCertificate.id,
                data
            );

        setCertificates((current) =>
            current.map(
                (certificate) =>
                    certificate.id ===
                    updatedCertificate.id
                        ? updatedCertificate
                        : certificate
            )
        );
    };

    const handleDelete = async (
        id: number
    ) => {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this certificate?"
            );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(id);

            await deleteCertificate(id);

            setCertificates((current) =>
                current.filter(
                    (certificate) =>
                        certificate.id !== id
                )
            );
        } catch (error) {
            console.error(
                "Failed to delete certificate:",
                error
            );

            setError(
                "Failed to delete certificate."
            );
        } finally {
            setDeletingId(null);
        }
    };

    const handleRetry = async () => {
        try {
            setError(null);
            setLoading(true);

            const data =
                await getCertificates();

            setCertificates(data);
        } catch (error) {
            console.error(
                "Failed to load certificates:",
                error
            );

            setError(
                "Failed to load certificates."
            );
        } finally {
            setLoading(false);
        }
    };

    const openCreateForm = () => {
        setEditingCertificate(null);
        setShowForm(true);
    };

    const openEditForm = (
        certificate: Certificate
    ) => {
        setEditingCertificate(
            certificate
        );
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingCertificate(null);
    };

    const handleFormSubmit = async (
        data: CertificateRequest
    ) => {
        if (editingCertificate) {
            await handleUpdate(data);
        } else {
            await handleCreate(data);
        }
    };

    const formatDate = (
        date: string
    ) => {
        return new Date(
            `${date}T00:00:00`
        ).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );
    };

    const isExpired = (
        certificate: Certificate
    ) => {
        if (!certificate.expiryDate) {
            return false;
        }

        return certificate.expiryDate < today;
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-zinc-500">
                    Loading certificates...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Certificates
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        Manage the certificates displayed on your portfolio.
                    </p>
                </div>

                <button
                    onClick={
                        openCreateForm
                    }
                    className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                    <Plus size={17} />
                    Add Certificate
                </button>
            </div>

            {error && (
                <div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
                    <p className="text-sm text-red-400">
                        {error}
                    </p>

                    <button
                        onClick={
                            handleRetry
                        }
                        className="text-sm text-zinc-300 underline underline-offset-4 hover:text-white"
                    >
                        Retry
                    </button>
                </div>
            )}

            <div className="relative">
                <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                />

                <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                        setSearch(
                            event.target.value
                        )
                    }
                    placeholder="Search certificates..."
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/40 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                />
            </div>

            {certificates.length === 0 && (
                <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-zinc-800">
                    <div className="text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                            <Award
                                size={20}
                                className="text-zinc-500"
                            />
                        </div>

                        <h2 className="mt-4 text-lg font-medium">
                            No certificates yet
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Add your first certificate to your portfolio.
                        </p>

                        <button
                            onClick={
                                openCreateForm
                            }
                            className="mt-5 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:opacity-90"
                        >
                            Add Certificate
                        </button>
                    </div>
                </div>
            )}

            {certificates.length > 0 &&
                filteredCertificates.length === 0 && (
                    <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-zinc-800">
                        <div className="text-center">
                            <h2 className="text-lg font-medium">
                                No matching certificates
                            </h2>

                            <p className="mt-2 text-sm text-zinc-500">
                                Try changing your search.
                            </p>
                        </div>
                    </div>
                )}

            {filteredCertificates.length > 0 && (
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                    {filteredCertificates.map(
                        (certificate) => {
                            const expired =
                                isExpired(
                                    certificate
                                );

                            return (
                                <div
                                    key={
                                        certificate.id
                                    }
                                    className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40"
                                >
                                    {certificate.certificateImageUrl && (
                                        <div className="h-48 overflow-hidden border-b border-zinc-800 bg-zinc-900">
                                            <img
                                                src={
                                                    certificate.certificateImageUrl
                                                }
                                                alt={
                                                    certificate.title
                                                }
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="p-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h2 className="text-lg font-medium">
                                                        {
                                                            certificate.title
                                                        }
                                                    </h2>

                                                    {expired && (
                                                        <span className="rounded-md border border-red-500/20 bg-red-500/5 px-2 py-1 text-xs text-red-400">
                                                            Expired
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="mt-2 text-sm text-zinc-400">
                                                    {
                                                        certificate.issuer
                                                    }
                                                </p>
                                            </div>

                                            <div className="flex shrink-0 items-center gap-1">
                                                <button
                                                    className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-white"
                                                    title="More"
                                                >
                                                    <MoreHorizontal
                                                        size={
                                                            18
                                                        }
                                                    />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        openEditForm(
                                                            certificate
                                                        )
                                                    }
                                                    className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-white"
                                                    title="Edit"
                                                >
                                                    <Pencil
                                                        size={
                                                            16
                                                        }
                                                    />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            certificate.id
                                                        )
                                                    }
                                                    disabled={
                                                        deletingId ===
                                                        certificate.id
                                                    }
                                                    className="rounded-lg p-2 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <Trash2
                                                        size={
                                                            16
                                                        }
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-500">
                                            <span className="flex items-center gap-1.5">
                                                <CalendarDays
                                                    size={
                                                        14
                                                    }
                                                />

                                                Issued{" "}
                                                {formatDate(
                                                    certificate.issueDate
                                                )}
                                            </span>

                                            {certificate.expiryDate && (
                                                <span className="flex items-center gap-1.5">
                                                    <CalendarDays
                                                        size={
                                                            14
                                                        }
                                                    />

                                                    Expires{" "}
                                                    {formatDate(
                                                        certificate.expiryDate
                                                    )}
                                                </span>
                                            )}
                                        </div>

                                        {certificate.credentialId && (
                                            <p className="mt-4 text-xs text-zinc-600">
                                                Credential ID:{" "}
                                                <span className="text-zinc-500">
                                                    {
                                                        certificate.credentialId
                                                    }
                                                </span>
                                            </p>
                                        )}

                                        {certificate.description && (
                                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-zinc-500">
                                                {
                                                    certificate.description
                                                }
                                            </p>
                                        )}

                                        <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">
                                            <span className="text-xs text-zinc-600">
                                                Updated{" "}
                                                {new Date(
                                                    certificate.updatedAt
                                                ).toLocaleDateString()}
                                            </span>

                                            {certificate.credentialUrl && (
                                                <a
                                                    href={
                                                        certificate.credentialUrl
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                                                >
                                                    Verify
                                                    <ExternalLink
                                                        size={
                                                            14
                                                        }
                                                    />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            )}

            {showForm && (
                <CertificateForm
                    certificate={
                        editingCertificate
                    }
                    onSubmit={
                        handleFormSubmit
                    }
                    onClose={
                        closeForm
                    }
                />
            )}
        </div>
    );
}

export default Certificates;