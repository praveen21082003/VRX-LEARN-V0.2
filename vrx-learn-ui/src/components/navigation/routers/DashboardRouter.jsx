import { useAuth } from "@/context/AuthContext";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import TrainerDashboard from "@/features/admin/dashboard/pages/TrainerDashboard";
import AdminDashboard from "@/features/admin/dashboard/pages/AdminDashboard";

export default function DashboardRouter() {
    const { role, viewRole } = useAuth();


    if (role === "admin" || role === "SUBADMIN") {
        return <AdminDashboard />;
    }

    if (viewRole === "trainer" && role === "trainer") {
        return <TrainerDashboard />;
    }

    if (role === "trainee"){
        return <DashboardPage />; 
    }

    return <p>role not there</p>; 
}