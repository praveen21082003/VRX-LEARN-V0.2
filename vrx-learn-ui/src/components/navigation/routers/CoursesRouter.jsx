import { useAuth } from "@/context/AuthContext";
import CourseManagement from "@/features/admin/dashboard/pages/CourseManagement";
import CoursesPage from "@/features/courses/pages/CoursesPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";


export default function CoursesRouter() {
    const { viewRole } = useAuth();


    if (viewRole === "ADMIN" || viewRole === "SUBADMIN") {
        return <CourseManagement />;
    }

    if (viewRole === "TRAINEE") {
        return <CoursesPage />;
    }

    return <DashboardPage />; 
}