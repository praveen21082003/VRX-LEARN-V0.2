import Header from "@/components/ui/Header";
import { Outlet } from "react-router-dom";
import { useRef } from "react";

export default function AppLayout() {
  const scrollRef = useRef(null);






  return (
    <div ref={scrollRef} className="h-screen w-screen flex flex-col overflow-hidden">
      <Header menu={true} />
      <main className="bg-background flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
