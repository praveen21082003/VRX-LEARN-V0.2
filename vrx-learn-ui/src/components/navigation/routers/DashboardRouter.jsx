import { useAuth } from "@/context/AuthContext";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import TrainerDashboard from "@/features/admin/dashboard/pages/TrainerDashboard";
import AdminDashboard from "@/features/admin/dashboard/pages/AdminDashboard";

export default function DashboardRouter() {
    const { viewRole } = useAuth();


    if (viewRole === "ADMIN" || viewRole === "SUBADMIN") {
        return <AdminDashboard />;
    }

    if (viewRole === "TRAINER") {
        return <TrainerDashboard />;
    }

    return <DashboardPage />; 
}