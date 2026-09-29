
import {Routes, Route, Navigate} from "react-router-dom";
import AdminLayout  from "../components/layout/AdminLayout.tsx";
import Dashboard from "../pages/dashboard/Dashboard.tsx";

import Profile from "../pages/profile/Profile.tsx";
import Projects from "../pages/projects/Projects.tsx";
import Experience from "../pages/experience/Experience.tsx";
import Education from "../pages/education/Education.tsx";
import Skills from "../pages/skills/Skills.tsx";
import Certificates from "../pages/certificates/Certificates.tsx";
import Resume from "../pages/resume/Resume.tsx";
import Messages from "../pages/messages/Messages.tsx";
import Activity from "../pages/activity/Activity.tsx";
import Settings from "../pages/settings/Settings.tsx";


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