import { useState, useEffect, useRef } from "react";
import { Outlet,useParams, useLocation } from "react-router-dom";
import { Header } from '@/components/ui'
import BackButton from "@/components/navigation/BackButton";

export default function AdminLayout() {
    const location = useLocation();
    const { courseSlug } = useParams();
    const isOverviewPage = location.pathname === `/course/${courseSlug}/overview`;
    const backPath = isOverviewPage
        ? "/dashboard"
        : `/course/${courseSlug}/overview`;

    const [breadcrumbs, setBreadcrumbs] = useState([

    ]);

    // Persist in session (optional)
    useEffect(() => {
        sessionStorage.setItem(
            "admin-breadcrumbs",
            JSON.stringify(breadcrumbs)
        );
    }, [breadcrumbs]);



    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden">

            <Header
                menu={false}
                breadcrumbs={breadcrumbs}
            />



            <main className="flex-1 overflow-y-auto bg-background">
                <div className="block lg:hidden p-2 w-full border-b border-default">
                    <BackButton to={backPath} iconName="material-symbols:arrow-back-rounded" label={isOverviewPage ? "Back to Dashboard" : "Back to Overview"} />
                </div>
                <Outlet
                    context={{
                        setCourseBreadcrumb: setBreadcrumbs,
                    }}
                />
            </main>
        </div>
    );
}
