import {
    Eye,
    FolderKanban,
    Code2,
    Mail,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
} from "lucide-react";

const stats = [
    {
        title: "Portfolio Views",
        value: "2,847",
        change: "+12.5%",
        positive: true,
        icon: Eye,
    },
    {
        title: "Projects",
        value: "12",
        change: "+2",
        positive: true,
        icon: FolderKanban,
    },
    {
        title: "Skills",
        value: "24",
        change: "+4",
        positive: true,
        icon: Code2,
    },
    {
        title: "Messages",
        value: "18",
        change: "-3",
        positive: false,
        icon: Mail,
    },
];

const activities = [
    {
        title: "Project updated",
        description: "Portfolio website",
        time: "10 minutes ago",
    },
    {
        title: "New skill added",
        description: "Spring Boot",
        time: "2 hours ago",
    },
    {
        title: "Profile updated",
        description: "Professional summary",
        time: "Yesterday",
    },
    {
        title: "Certificate uploaded",
        description: "Java Certification",
        time: "2 days ago",
    },
];

function Dashboard() {
    return (
        <div className="space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                    Dashboard
                </h1>

                <p className="mt-2 text-sm text-zinc-500">
                    Here's what's happening with your portfolio.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
                        >

                            {/* Top */}
                            <div className="flex items-center justify-between">

                                <p className="text-sm text-zinc-500">
                                    {stat.title}
                                </p>

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800">
                                    <Icon size={18} className="text-zinc-300" />
                                </div>

                            </div>

                            {/* Value */}
                            <div className="mt-5 flex items-end justify-between">

                                <h2 className="text-2xl font-semibold">
                                    {stat.value}
                                </h2>

                                <div
                                    className={`flex items-center gap-1 text-xs ${
                                        stat.positive
                                            ? "text-emerald-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    {stat.positive ? (
                                        <ArrowUpRight size={14} />
                                    ) : (
                                        <ArrowDownRight size={14} />
                                    )}

                                    {stat.change}
                                </div>

                            </div>

                        </div>
                    );
                })}

            </div>

            {/* Analytics */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">

                <div className="flex items-center justify-between">

                    <div>
                        <h2 className="text-lg font-medium">
                            Portfolio Analytics
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            Portfolio traffic over the selected period.
                        </p>
                    </div>

                    <select
                        className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300 outline-none"
                        defaultValue="30"
                    >
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 90 days</option>
                    </select>

                </div>

                {/* Chart placeholder */}
                <div className="mt-6 flex h-64 items-center justify-center rounded-lg border border-dashed border-zinc-800">

                    <div className="text-center">

                        <Activity
                            size={28}
                            className="mx-auto text-zinc-600"
                        />

                        <p className="mt-3 text-sm text-zinc-500">
                            Analytics chart will appear here
                        </p>

                    </div>

                </div>

            </div>

            {/* Bottom section */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                {/* Recent Activity */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">

                    <div className="flex items-center justify-between">

                        <div>
                            <h2 className="text-lg font-medium">
                                Recent Activity
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                                Recent changes in your portfolio.
                            </p>
                        </div>

                    </div>

                    <div className="mt-6 space-y-5">

                        {activities.map((activity) => (
                            <div
                                key={`${activity.title}-${activity.time}`}
                                className="flex items-start gap-4"
                            >

                                <div className="mt-1 h-2 w-2 rounded-full bg-zinc-500" />

                                <div className="flex-1">

                                    <p className="text-sm font-medium">
                                        {activity.title}
                                    </p>

                                    <p className="mt-1 text-xs text-zinc-500">
                                        {activity.description}
                                    </p>

                                </div>

                                <span className="text-xs text-zinc-600">
                  {activity.time}
                </span>

                            </div>
                        ))}

                    </div>

                </div>

                {/* Recent Messages */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">

                    <div>
                        <h2 className="text-lg font-medium">
                            Recent Messages
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            Messages received from your portfolio.
                        </p>
                    </div>

                    <div className="mt-6 space-y-4">

                        <div className="rounded-lg border border-zinc-800 p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">
                                    Rahul Sharma
                                </p>

                                <span className="text-xs text-zinc-600">
                  2h ago
                </span>
                            </div>

                            <p className="mt-2 text-xs text-zinc-500">
                                Interested in discussing a backend development opportunity.
                            </p>
                        </div>

                        <div className="rounded-lg border border-zinc-800 p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">
                                    Ankit Kumar
                                </p>

                                <span className="text-xs text-zinc-600">
                  Yesterday
                </span>
                            </div>

                            <p className="mt-2 text-xs text-zinc-500">
                                Loved your portfolio. I have a project I'd like to discuss.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;