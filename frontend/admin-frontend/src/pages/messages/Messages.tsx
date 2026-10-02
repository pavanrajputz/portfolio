import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Search,
    Mail,
    MailOpen,
    Trash2,
    X,
    CalendarDays,
    User,
    ExternalLink,
} from "lucide-react";

import {
    deleteMessage,
    getMessages,
    markMessageAsRead,
} from "../../services/MessageService";

import type {
    Message,
} from "../../types/Message";

type MessageFilter =
    | "all"
    | "unread"
    | "read";

function Messages() {

    const [messages, setMessages] =
        useState<Message[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [search, setSearch] =
        useState("");

    const [filter, setFilter] =
        useState<MessageFilter>(
            "all"
        );

    const [selectedMessage, setSelectedMessage] =
        useState<Message | null>(null);

    const [deletingId, setDeletingId] =
        useState<number | null>(null);

    const [markingReadId, setMarkingReadId] =
        useState<number | null>(null);

    useEffect(() => {

        let cancelled = false;

        const loadMessages =
            async () => {

                try {

                    const data =
                        await getMessages();

                    if (cancelled) {
                        return;
                    }

                    setMessages(data);
                    setError(null);

                } catch (error) {

                    if (cancelled) {
                        return;
                    }

                    console.error(
                        "Failed to load messages:",
                        error
                    );

                    setError(
                        "Failed to load messages."
                    );

                } finally {

                    if (!cancelled) {
                        setLoading(false);
                    }

                }
            };

        void loadMessages();

        return () => {
            cancelled = true;
        };

    }, []);

    const unreadCount =
        useMemo(
            () =>
                messages.filter(
                    (message) =>
                        !message.isRead
                ).length,
            [messages]
        );

    const filteredMessages =
        useMemo(() => {

            const normalizedSearch =
                search
                    .trim()
                    .toLowerCase();

            return messages.filter(
                (message) => {

                    const matchesSearch =
                        normalizedSearch === "" ||
                        message.name
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||
                        message.email
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||
                        (
                            message.subject ??
                            ""
                        )
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||
                        message.message
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            );

                    const matchesFilter =
                        filter === "all" ||
                        (
                            filter ===
                            "unread" &&
                            !message.isRead
                        ) ||
                        (
                            filter ===
                            "read" &&
                            message.isRead
                        );

                    return (
                        matchesSearch &&
                        matchesFilter
                    );
                }
            );

        }, [
            messages,
            search,
            filter,
        ]);

    const formatDate = (
        date: string
    ) => {

        return new Date(
            date
        ).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );

    };

    const formatDateTime = (
        date: string
    ) => {

        return new Date(
            date
        ).toLocaleString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
            }
        );

    };

    const openMessage = async (
        message: Message
    ) => {

        setSelectedMessage(
            message
        );

        if (message.isRead) {
            return;
        }

        try {

            setMarkingReadId(
                message.id
            );

            const updatedMessage =
                await markMessageAsRead(
                    message.id
                );

            setMessages((current) =>
                current.map(
                    (item) =>
                        item.id ===
                        updatedMessage.id
                            ? updatedMessage
                            : item
                )
            );

            setSelectedMessage(
                updatedMessage
            );

        } catch (error) {

            console.error(
                "Failed to mark message as read:",
                error
            );

            setError(
                "Failed to mark message as read."
            );

        } finally {

            setMarkingReadId(null);

        }

    };

    const handleDelete = async (
        id: number
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this message?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setDeletingId(id);

            await deleteMessage(id);

            setMessages((current) =>
                current.filter(
                    (message) =>
                        message.id !== id
                )
            );

            if (
                selectedMessage?.id ===
                id
            ) {
                setSelectedMessage(
                    null
                );
            }

        } catch (error) {

            console.error(
                "Failed to delete message:",
                error
            );

            setError(
                "Failed to delete message."
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
                await getMessages();

            setMessages(data);

        } catch (error) {

            console.error(
                "Failed to load messages:",
                error
            );

            setError(
                "Failed to load messages."
            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="flex min-h-[400px] items-center justify-center">

                <p className="text-sm text-zinc-500">
                    Loading messages...
                </p>

            </div>
        );

    }

    return (
        <div className="space-y-8">

            {/* Header */}

            <div>

                <div className="flex items-center gap-3">

                    <h1 className="text-3xl font-semibold tracking-tight">
                        Messages
                    </h1>

                    {unreadCount > 0 && (
                        <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300">
                            {unreadCount} unread
                        </span>
                    )}

                </div>

                <p className="mt-2 text-sm text-zinc-500">
                    Messages received through your portfolio contact form.
                </p>

            </div>

            {/* Error */}

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

            {/* Filters */}

            <div className="flex flex-col gap-3 lg:flex-row">

                <div className="relative flex-1">

                    <Search
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(
                            event
                        ) =>
                            setSearch(
                                event.target.value
                            )
                        }
                        placeholder="Search messages..."
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900/40 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                    />

                </div>

                <div className="flex rounded-lg border border-zinc-800 bg-zinc-900/40 p-1">

                    <button
                        onClick={() =>
                            setFilter(
                                "all"
                            )
                        }
                        className={`rounded-md px-3 py-2 text-xs transition-colors ${
                            filter === "all"
                                ? "bg-zinc-800 text-white"
                                : "text-zinc-500 hover:text-zinc-300"
                        }`}
                    >
                        All
                    </button>

                    <button
                        onClick={() =>
                            setFilter(
                                "unread"
                            )
                        }
                        className={`rounded-md px-3 py-2 text-xs transition-colors ${
                            filter ===
                            "unread"
                                ? "bg-zinc-800 text-white"
                                : "text-zinc-500 hover:text-zinc-300"
                        }`}
                    >
                        Unread
                    </button>

                    <button
                        onClick={() =>
                            setFilter(
                                "read"
                            )
                        }
                        className={`rounded-md px-3 py-2 text-xs transition-colors ${
                            filter === "read"
                                ? "bg-zinc-800 text-white"
                                : "text-zinc-500 hover:text-zinc-300"
                        }`}
                    >
                        Read
                    </button>

                </div>

            </div>

            {/* Empty */}

            {messages.length === 0 && (
                <div className="flex min-h-[350px] items-center justify-center rounded-xl border border-dashed border-zinc-800">

                    <div className="text-center">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">

                            <Mail
                                size={20}
                                className="text-zinc-500"
                            />

                        </div>

                        <h2 className="mt-4 text-lg font-medium">
                            No messages yet
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Messages from your portfolio visitors will appear here.
                        </p>

                    </div>

                </div>
            )}

            {/* No Results */}

            {messages.length > 0 &&
                filteredMessages.length ===
                0 && (
                    <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-zinc-800">

                        <div className="text-center">

                            <h2 className="text-lg font-medium">
                                No matching messages
                            </h2>

                            <p className="mt-2 text-sm text-zinc-500">
                                Try changing your search or filter.
                            </p>

                        </div>

                    </div>
                )}

            {/* Message List */}

            {filteredMessages.length >
                0 && (
                    <div className="overflow-hidden rounded-xl border border-zinc-800">

                        <div className="divide-y divide-zinc-800">

                            {filteredMessages.map(
                                (message) => {

                                    const isDeleting =
                                        deletingId ===
                                        message.id;

                                    const isMarkingRead =
                                        markingReadId ===
                                        message.id;

                                    return (
                                        <div
                                            key={
                                                message.id
                                            }
                                            className={`group flex cursor-pointer gap-4 px-5 py-5 transition-colors hover:bg-zinc-900/40 ${
                                                !message.isRead
                                                    ? "bg-zinc-900/20"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                openMessage(
                                                    message
                                                )
                                            }
                                        >

                                            {/* Icon */}

                                            <div className="shrink-0">

                                                <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                                                    message.isRead
                                                        ? "border-zinc-800 bg-zinc-900 text-zinc-600"
                                                        : "border-zinc-700 bg-zinc-800 text-zinc-300"
                                                }`}>

                                                    {message.isRead ? (
                                                        <MailOpen
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    ) : (
                                                        <Mail
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    )}

                                                </div>

                                            </div>

                                            {/* Content */}

                                            <div className="min-w-0 flex-1">

                                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                                                    <div className="flex min-w-0 items-center gap-2">

                                                    <span className={`truncate text-sm ${
                                                        message.isRead
                                                            ? "text-zinc-400"
                                                            : "font-medium text-white"
                                                    }`}>
                                                        {
                                                            message.name
                                                        }
                                                    </span>

                                                        {!message.isRead && (
                                                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                                                        )}

                                                    </div>

                                                    <span className="shrink-0 text-xs text-zinc-600">
                                                    {
                                                        formatDate(
                                                            message.createdAt
                                                        )
                                                    }
                                                </span>

                                                </div>

                                                <p className="mt-1 truncate text-xs text-zinc-600">
                                                    {
                                                        message.email
                                                    }
                                                </p>

                                                <p className={`mt-3 truncate text-sm ${
                                                    message.isRead
                                                        ? "text-zinc-500"
                                                        : "text-zinc-300"
                                                }`}>
                                                    {
                                                        message.subject ||
                                                        "No subject"
                                                    }
                                                </p>

                                                <p className="mt-1 line-clamp-1 text-xs text-zinc-600">
                                                    {
                                                        message.message
                                                    }
                                                </p>

                                            </div>

                                            {/* Actions */}

                                            <div
                                                className="flex shrink-0 items-center gap-1 self-center opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100"
                                                onClick={(
                                                    event
                                                ) =>
                                                    event.stopPropagation()
                                                }
                                            >

                                                {!message.isRead && (
                                                    <button
                                                        onClick={() =>
                                                            openMessage(
                                                                message
                                                            )
                                                        }
                                                        disabled={
                                                            isMarkingRead
                                                        }
                                                        className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-white disabled:opacity-50"
                                                        title="Mark as read"
                                                    >
                                                        <MailOpen
                                                            size={
                                                                16
                                                            }
                                                        />
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            message.id
                                                        )
                                                    }
                                                    disabled={
                                                        isDeleting
                                                    }
                                                    className="rounded-lg p-2 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
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
                                    );
                                }
                            )}

                        </div>

                    </div>
                )}

            {/* Message Detail Modal */}

            {selectedMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">

                        {/* Modal Header */}

                        <div className="flex items-start justify-between border-b border-zinc-800 px-6 py-5">

                            <div className="min-w-0">

                                <div className="flex items-center gap-2">

                                    <h2 className="truncate text-lg font-semibold">
                                        {
                                            selectedMessage.subject ||
                                            "No subject"
                                        }
                                    </h2>

                                    {selectedMessage.isRead && (
                                        <span className="shrink-0 rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-500">
                                            Read
                                        </span>
                                    )}

                                </div>

                                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-600">

                                    <span className="flex items-center gap-1.5">

                                        <CalendarDays
                                            size={
                                                13
                                            }
                                        />

                                        {
                                            formatDateTime(
                                                selectedMessage.createdAt
                                            )
                                        }

                                    </span>

                                </div>

                            </div>

                            <button
                                onClick={() =>
                                    setSelectedMessage(
                                        null
                                    )
                                }
                                className="shrink-0 rounded-lg p-2 text-zinc-500 hover:bg-zinc-900 hover:text-white"
                            >
                                <X size={18} />
                            </button>

                        </div>

                        {/* Sender */}

                        <div className="border-b border-zinc-800 px-6 py-5">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">

                                    <User
                                        size={
                                            17
                                        }
                                        className="text-zinc-500"
                                    />

                                </div>

                                <div>

                                    <p className="text-sm font-medium text-zinc-200">
                                        {
                                            selectedMessage.name
                                        }
                                    </p>

                                    <a
                                        href={`mailto:${selectedMessage.email}`}
                                        className="mt-1 flex items-center gap-1 text-xs text-zinc-500 hover:text-white"
                                    >
                                        {
                                            selectedMessage.email
                                        }

                                        <ExternalLink
                                            size={
                                                12
                                            }
                                        />
                                    </a>

                                </div>

                            </div>

                        </div>

                        {/* Message */}

                        <div className="max-h-[50vh] overflow-y-auto px-6 py-6">

                            <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-400">
                                {
                                    selectedMessage.message
                                }
                            </p>

                        </div>

                        {/* Footer */}

                        <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-4">

                            <span className="text-xs text-zinc-600">
                                Message #
                                {
                                    selectedMessage.id
                                }
                            </span>

                            <div className="flex items-center gap-2">

                                <a
                                    href={`mailto:${selectedMessage.email}`}
                                    className="rounded-lg border border-zinc-800 px-3 py-2 text-xs text-zinc-400 hover:bg-zinc-900 hover:text-white"
                                >
                                    Reply
                                </a>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            selectedMessage.id
                                        )
                                    }
                                    className="rounded-lg px-3 py-2 text-xs text-red-400 hover:bg-red-500/10"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Messages;