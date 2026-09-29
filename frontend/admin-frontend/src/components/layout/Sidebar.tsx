import {
    LayoutDashboard,
    User,
    FolderKanban,
    BriefcaseBusiness,
    GraduationCap,
    Code2,
    Award,
    FileText,
    Mail,
    Activity,
    Settings,
    LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navigation = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin",
    },
    {
        title: "Profile",
        icon: User,
        path: "/admin/profile",
    },
    {
        title: "Projects",
        icon: FolderKanban,
        path: "/admin/projects",
    },
    {
        title: "Experience",
        icon: BriefcaseBusiness,
        path: "/admin/experience",
    },
    {
        title: "Education",
        icon: GraduationCap,
        path: "/admin/education",
    },
    {
        title: "Skills",
        icon: Code2,
        path: "/admin/skills",
    },
    {
        title: "Certificates",
        icon: Award,
        path: "/admin/certificates",
    },
    {
        title: "Resume",
        icon: FileText,
        path: "/admin/resume",
    },
    {
        title: "Messages",
        icon: Mail,
        path: "/admin/messages",
    },
    {
        title: "Activity",
        icon: Activity,
        path: "/admin/activity",
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/admin/settings",
    },
];

function Sidebar() {
    return (
        <aside
            className="fixed left-0 top-0 flex h-screen w-64
            flex-col border-r border-zinc-800 bg-zinc-950 text-white"
        >

            {/* Logo */}
            <div
                className="flex h-24 flex-col justify-center
                border-b border-zinc-800 px-6"
            >
                <h1 className="text-lg font-semibold leading-tight">
                    Portfolio
                </h1>

                <p className="mt-1 text-xs text-zinc-500">
                    Admin Panel
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-6">

                <p
                    className="mb-3 px-3 text-xs font-medium
                    uppercase tracking-wider text-zinc-500"
                >
                    Management
                </p>

                <div className="space-y-1">
                    {navigation.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/admin"}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg
                                    px-3 py-2.5 text-sm transition-colors ${
                                        isActive
                                            ? "bg-zinc-800 text-white"
                                            : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                                    }`
                                }
                            >
                                <Icon
                                    size={18}
                                    strokeWidth={1.8}
                                />

                                <span>
                                    {item.title}
                                </span>
                            </NavLink>
                        );
                    })}
                </div>
            </nav>

            {/* Logout */}
            <div className="border-t border-zinc-800 p-3">
                <button
                    className="flex w-full items-center gap-3
                    rounded-lg px-3 py-2.5 text-sm text-zinc-400
                    transition-colors hover:bg-zinc-900 hover:text-white"
                >
                    <LogOut
                        size={18}
                        strokeWidth={1.8}
                    />

                    <span>
                        Logout
                    </span>
                </button>
            </div>

        </aside>
    );
}

export default Sidebar;