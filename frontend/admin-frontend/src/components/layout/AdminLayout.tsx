import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface AdminLayoutProps {
    children: ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-zinc-950 text-white">

            {/* Sidebar */}
            <Sidebar />

            {/* Main area */}
            <div className="ml-64 min-h-screen">

                {/* Topbar */}
                <Topbar />

                {/* Page content */}
                <main className="p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;