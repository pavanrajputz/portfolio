import {
    Bell,
    Search,
    User,
} from "lucide-react";

function Topbar() {
    return (
        <header className="flex h-20 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-8 text-white">

            {/* Left side */}
            <div>
                <h2 className="text-xl font-semibold">
                    Dashboard
                </h2>

                <p className="text-sm text-zinc-500">
                    Welcome back, Admin
                </p>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">

                {/* Search */}
                <button
                    className="flex h-10 w-10 items-center justify-center rounded-lg
          text-zinc-400 transition-colors
          hover:bg-zinc-900 hover:text-white"
                >
                    <Search size={19} strokeWidth={1.8} />
                </button>

                {/* Notifications */}
                <button
                    className="relative flex h-10 w-10 items-center justify-center
          rounded-lg text-zinc-400 transition-colors
          hover:bg-zinc-900 hover:text-white"
                >
                    <Bell size={19} strokeWidth={1.8} />

                    {/* Notification indicator */}
                    <span
                        className="absolute right-2 top-2 h-1.5 w-1.5
            rounded-full bg-red-500"
                    />
                </button>

                {/* Divider */}
                <div className="h-8 w-px bg-zinc-800" />

                {/* Admin profile */}
                <button className="flex items-center gap-3">

                    <div
                        className="flex h-9 w-9 items-center justify-center
            rounded-full bg-zinc-800"
                    >
                        <User size={18} />
                    </div>

                    <div className="hidden text-left sm:block">
                        <p className="text-sm font-medium">
                            Admin
                        </p>

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