import { useAuth } from "@/context/AuthContext";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import TrainerDashboard from "@/features/admin/dashboard/pages/TrainerDashboard";
import AdminDashboard from "@/features/admin/dashboard/pages/AdminDashboard";

export default function DashboardRouter() {
    const { role } = useAuth();


    if (role === "ADMIN" || role === "SUBADMIN") {
        return <AdminDashboard />;
    }

    if (role === "TRAINER") {
        return <TrainerDashboard />;
    }

    return <DashboardPage />; 
}