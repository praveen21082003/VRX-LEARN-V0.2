import { useAuth } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";
import { ROLE_PERMISSION } from '@/config/permission';

export default function ProtectedRoute() {
    const { user, role, loading } = useAuth();

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (!user) {
        return <Navigate to='/' replace />
    }

    if (ROLE_PERMISSION && !Object.keys(ROLE_PERMISSION).includes("ADMIN")) {
        return <Navigate to="/unauthorized" replace />
    }


    return <Outlet />;


}