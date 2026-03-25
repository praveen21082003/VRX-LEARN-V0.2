import { useAuth } from "@/context/AuthContext";
import CourseManagement from "@/features/admin/dashboard/pages/CourseManagement";
import CoursesPage from "@/features/courses/pages/CoursesPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";


export default function CoursesRouter() {
    const { role,viewRole } = useAuth();


    if (role === "ADMIN" || role === "SUBADMIN") {
        return <CourseManagement />;
    }

    if (viewRole === "TRAINEE") {
        return <CoursesPage />;
    }

    return <CoursesPage />; 
}