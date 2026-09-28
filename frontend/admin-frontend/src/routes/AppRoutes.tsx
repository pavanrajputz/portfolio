
import {Routes, Route, Navigate} from "react-router-dom";
import AdminLayout  from "../components/layout/AdminLayout.tsx";
import Dashboard from "../pages/dashboard/Dashboard.tsx";


function AppRoutes(){
    return (
        <Routes>
            <Route path="/admin" element={<AdminLayout/>}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />

                <Route path="projects" element={<Projects />} />

                <Route path="experience" element={<Experience />} />

                <Route path="education" element={<Education />} />

                <Route path="skills" element={<Skills />} />

                <Route
                    path="certificates"
                    element={<Certificates />}
                />

                <Route path="resume" element={<Resume />} />

                <Route path="messages" element={<Messages />} />

                <Route path="activity" element={<Activity />} />

                <Route path="settings" element={<Settings />} />
            </Route>

            <Route
                path="*"
                element={<Navigate to="/admin" replace/> }
            />
        </Routes>
    );
}

export default AppRoutes;