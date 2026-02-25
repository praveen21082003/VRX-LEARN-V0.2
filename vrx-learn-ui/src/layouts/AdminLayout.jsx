import { useState, useEffect, useRef } from "react";
import { Outlet, } from "react-router-dom";
import { Header } from '@/components/ui'

export default function AdminLayout() {

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

            <div className="h-[5vh] min-h-14 shrink-0">
                <Header
                    menu={false}
                    breadcrumbs={breadcrumbs}
                />
            </div>


            <main className="flex-1 overflow-y-auto bg-background">
                <Outlet
                    context={{
                        setCourseBreadcrumb: setBreadcrumbs,
                    }}
                />
            </main>
        </div>
    );
}
