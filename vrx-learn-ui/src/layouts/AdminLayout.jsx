import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Header } from '@/components/ui'

export default function AdminLayout() {
    const [breadcrumbs, setBreadcrumbs] = useState(() => {
        const stored = sessionStorage.getItem("admin-breadcrumbs");
        return stored
            ? JSON.parse(stored)
            : [{ label: "Admin", to: "/dashboard" }];
    });

    useEffect(() => {
        sessionStorage.setItem(
            "admin-breadcrumbs",
            JSON.stringify(breadcrumbs)
        );
    }, [breadcrumbs]);

    const setCourseBreadcrumb = (course) => {
        setBreadcrumbs((prev) => {
            const base = prev.slice(0, 1);
            return [...base, { label: course, to: "" }];
        });
    };

    const setSectionBreadcrumb = (sectionLabel) => {
        setBreadcrumbs((prev) => {
            const base = prev.slice(0, 2);
            return [...base, { label: sectionLabel }];
        });
    };



    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden">

            <div className="h-[5vh] min-h-14 shrink-0">
                <Header
                    menu={false}
                    breadcrumbs={breadcrumbs}
                />
            </div>


            <main className="flex-1 overflow-y-auto bg-background">
                <Outlet
                    context={{
                        setCourseBreadcrumb,
                        setSectionBreadcrumb,
                    }}
                />
            </main>
        </div>
    );
}
