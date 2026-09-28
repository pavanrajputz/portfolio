import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/dashboard/Dashboard.tsx";

function App() {
    return (
        <AdminLayout>
            <Dashboard />
        </AdminLayout>
    );
}

export default App;