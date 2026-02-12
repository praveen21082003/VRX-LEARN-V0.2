import { Outlet } from "react-router-dom";
import { Header }from '@/components/ui'

export default function AdminLayout() {
    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden">

            <div className="h-[5vh] min-h-14 shrink-0">
                <Header menu={false} />
            </div>


            <main className="flex-1 overflow-y-auto bg-background">
                <Outlet />
            </main>
        </div>
    );
}
