import Header from "@/components/ui/Header";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">

      
      <div className="h-[5vh] min-h-14 shrink-0">
        <Header menu={true}/>
      </div>

      <main className="bg-background flex-1 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}
