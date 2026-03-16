import WelcomeSection from "../sections/WelcomeSection";
import MyCoursesSection from "../sections/MyCoursesSection";
import AllCoursesSection from "../sections/AllCoursesSection";
import CalendarSection from "../sections/CalendarSection";
import { useAuth } from "@/context/AuthContext";
import GraphSection from "../sections/GraphSection";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-14 h-full">

      
      <section className="lg:col-span-10 min-w-0 flex flex-col gap-6 py-6 lg:py-8 px-4 lg:pl-6 lg:overflow-y-auto lg:scrollbar-hide">
        <WelcomeSection user={user} />
        <MyCoursesSection />
        <AllCoursesSection />
      </section>

      <aside className="lg:col-span-4 min-w-0 px-4 lg:px-0 lg:overflow-y-auto lg:scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:py-8 lg:pr-6">
          <GraphSection />
          <CalendarSection />
        </div>
      </aside>

    </div>
  );
}