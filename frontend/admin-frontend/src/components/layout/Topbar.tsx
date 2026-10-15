
import { useEffect, useMemo, useState } from "react";
import {
    Bell,
    Search,
    User,
    X,
    Mail,
    LayoutDashboard,
    FolderKanban,
    BriefcaseBusiness,
    GraduationCap,
    Code2,
    Award,
    FileText,
    Activity,
    Settings,
    UserRound,
    LoaderCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { getMessages } from "../../services/MessageService";
import type { Message } from "../../types/Message";

const navigationItems = [
    { title: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { title: "Profile", path: "/admin/profile", icon: UserRound },
    { title: "Projects", path: "/admin/projects", icon: FolderKanban },
    { title: "Experience", path: "/admin/experience", icon: BriefcaseBusiness },
    { title: "Education", path: "/admin/education", icon: GraduationCap },
    { title: "Skills", path: "/admin/skills", icon: Code2 },
    { title: "Certificates", path: "/admin/certificates", icon: Award },
    { title: "Resume", path: "/admin/resume", icon: FileText },
    { title: "Messages", path: "/admin/messages", icon: Mail },
    { title: "Activity", path: "/admin/activity", icon: Activity },
    { title: "Settings", path: "/admin/settings", icon: Settings },
];

function Topbar() {
    const navigate = useNavigate();

    const [searchOpen, setSearchOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [notificationsLoading, setNotificationsLoading] = useState(true);
    const [notificationsError, setNotificationsError] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const loadMessages = async () => {
            try {
                const data = await getMessages();

                if (!cancelled) {
                    setMessages(data);
                    setNotificationsError(false);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("Failed to load notifications:", error);
                    setNotificationsError(true);
                }
            } finally {
                if (!cancelled) {
                    setNotificationsLoading(false);
                }
            }
        };

        void loadMessages();

        const intervalId = window.setInterval(() => {
            void loadMessages();
        }, 60_000);

        return () => {
            cancelled = true;
            window.clearInterval(intervalId);
        };
    }, []);

    const unreadMessages = useMemo(
        () => messages
            .filter((message) => !message.isRead)
            .sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            ),
        [messages]
    );

    const filteredNavigation = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return navigationItems;
        }

        return navigationItems.filter((item) =>
            item.title.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const openPage = (path: string) => {
        navigate(path);
        setSearchOpen(false);
        setNotificationOpen(false);
        setSearchQuery("");
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    return (
        <header className="relative z-30 flex h-20 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-8 text-white">
            <div>
                <h2 className="text-xl font-semibold">Dashboard</h2>
                <p className="text-sm text-zinc-500">
                    Welcome back, Admin
                </p>
            </div>

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative">
                    <button
                        type="button"
                        aria-label="Search admin sections"
                        aria-expanded={searchOpen}
                        onClick={() => {
                            setSearchOpen((current) => !current);
                            setNotificationOpen(false);
                            setSearchQuery("");
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
                    >
                        {searchOpen ? (
                            <X size={19} strokeWidth={1.8} />
                        ) : (
                            <Search size={19} strokeWidth={1.8} />
                        )}
                    </button>

                    {searchOpen && (
                        <div className="absolute right-0 top-14 w-[min(340px,calc(100vw-2rem))] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">
                            <div className="border-b border-zinc-800 p-3">
                                <div className="relative">
                                    <Search
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                                    />
                                    <input
                                        autoFocus
                                        value={searchQuery}
                                        onChange={(event) =>
                                            setSearchQuery(event.target.value)
                                        }
                                        onKeyDown={(event) => {
                                            if (
                                                event.key === "Escape"
                                            ) {
                                                setSearchOpen(false);
                                            }

                                            if (
                                                event.key === "Enter" &&
                                                filteredNavigation.length > 0
                                            ) {
                                                openPage(filteredNavigation[0].path);
                                            }
                                        }}
                                        placeholder="Search admin sections..."
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                                    />
                                </div>
                            </div>

                            <div className="max-h-80 overflow-y-auto p-2">
                                <p className="px-2 py-2 text-xs font-medium uppercase tracking-wider text-zinc-600">
                                    Pages
                                </p>

                                {filteredNavigation.length === 0 ? (
                                    <p className="px-3 py-6 text-center text-sm text-zinc-500">
                                        No matching sections found.
                                    </p>
                                ) : (
                                    filteredNavigation.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <button
                                                key={item.path}
                                                type="button"
                                                onClick={() => openPage(item.path)}
                                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
                                            >
                                                <Icon size={16} className="text-zinc-500" />
                                                {item.title}
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Notifications */}
                <div className="relative">
                    <button
                        type="button"
                        aria-label={`Notifications, ${unreadMessages.length} unread messages`}
                        aria-expanded={notificationOpen}
                        onClick={() => {
                            setNotificationOpen((current) => !current);
                            setSearchOpen(false);
                        }}
                        className="relative flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
                    >
                        <Bell size={19} strokeWidth={1.8} />

                        {unreadMessages.length > 0 && (
                            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                                {unreadMessages.length > 9
                                    ? "9+"
                                    : unreadMessages.length}
                            </span>
                        )}
                    </button>

                    {notificationOpen && (
                        <div className="absolute right-0 top-14 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">
                            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-4">
                                <div>
                                    <h3 className="text-sm font-semibold">
                                        Notifications
                                    </h3>
                                    <p className="mt-1 text-xs text-zinc-500">
                                        {unreadMessages.length} unread messages
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    aria-label="Close notifications"
                                    onClick={() => setNotificationOpen(false)}
                                    className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-900 hover:text-white"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {notificationsLoading && messages.length === 0 ? (
                                <div className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-zinc-500">
                                    <LoaderCircle size={16} className="animate-spin" />
                                    Loading notifications...
                                </div>
                            ) : notificationsError && messages.length === 0 ? (
                                <div className="px-4 py-8 text-center">
                                    <p className="text-sm text-red-400">
                                        Could not load notifications.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            setNotificationsLoading(true);
                                            try {
                                                const data = await getMessages();
                                                setMessages(data);
                                                setNotificationsError(false);
                                            } catch (error) {
                                                console.error(error);
                                                setNotificationsError(true);
                                            } finally {
                                                setNotificationsLoading(false);
                                            }
                                        }}
                                        className="mt-3 text-xs text-zinc-300 underline underline-offset-4 hover:text-white"
                                    >
                                        Retry
                                    </button>
                                </div>
                            ) : unreadMessages.length === 0 ? (
                                <div className="px-4 py-10 text-center">
                                    <Mail
                                        size={22}
                                        className="mx-auto text-zinc-600"
                                    />
                                    <p className="mt-3 text-sm text-zinc-300">
                                        You’re all caught up
                                    </p>
                                    <p className="mt-1 text-xs text-zinc-500">
                                        New unread messages will appear here.
                                    </p>
                                </div>
                            ) : (
                                <div className="max-h-80 overflow-y-auto">
                                    {unreadMessages.slice(0, 5).map((message) => (
                                        <button
                                            key={message.id}
                                            type="button"
                                            onClick={() => openPage("/admin/messages")}
                                            className="flex w-full gap-3 border-b border-zinc-800/70 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-zinc-900"
                                        >
                                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                                            <span className="min-w-0 flex-1">
                                                <span className="flex items-center justify-between gap-2">
                                                    <span className="truncate text-sm font-medium text-zinc-200">
                                                        {message.name}
                                                    </span>
                                                    <span className="shrink-0 text-[11px] text-zinc-600">
                                                        {formatDate(message.createdAt)}
                                                    </span>
                                                </span>

                                                <span className="mt-1 block truncate text-xs text-zinc-500">
                                                    {message.subject || "No subject"}
                                                </span>

                                                <span className="mt-1 block line-clamp-2 text-xs leading-5 text-zinc-600">
                                                    {message.message}
                                                </span>
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="border-t border-zinc-800 p-3">
                                <button
                                    type="button"
                                    onClick={() => openPage("/admin/messages")}
                                    className="w-full rounded-lg bg-zinc-900 px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                                >
                                    Open Messages
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="h-8 w-px bg-zinc-800" />

                {/* Admin profile */}
                <button
                    type="button"
                    onClick={() => openPage("/admin/profile")}
                    className="flex items-center gap-3"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800">
                        <User size={18} />
                    </div>

                    <div className="hidden text-left sm:block">
                        <p className="text-sm font-medium">Admin</p>
                        <p className="text-xs text-zinc-500">
                            Administrator
                        </p>
                    </div>
                </button>
            </div>
        </header>
    );
}

export default Topbar;
