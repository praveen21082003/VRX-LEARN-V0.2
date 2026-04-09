import { useAuth } from "@/context/AuthContext";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import TrainerDashboard from "@/features/admin/dashboard/pages/TrainerDashboard";
import AdminDashboard from "@/features/admin/dashboard/pages/AdminDashboard";

export default function DashboardRouter() {
    const { role, viewRole, loading } = useAuth();

    if (loading) return null;

    const effectiveRole = viewRole || role;

    if (role === "admin" || role === "subadmin") {
        return <AdminDashboard />;
    }

    if (effectiveRole === "trainer") {
        return <TrainerDashboard />;
    }

    if (effectiveRole === "trainee") {
        return <DashboardPage />;
    }

    return <p>No dashboard available</p>;
}