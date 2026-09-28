import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AdminLayout() {
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
                    <Outlet/>
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;