import WelcomeSection from "../sections/WelcomeSection";
import MyCoursesSection from "../sections/MyCoursesSection";
import AllCoursesSection from "../sections/AllCoursesSection";
import CalendarSection from "../sections/CalendarSection";
import { useAuth } from "@/context/AuthContext"
import GraphSection from "../sections/GraphSection";




export default function DashboardPage() {
  const { user, loading } = useAuth();

  return (
    <div className="grid grid-cols-14 gap-6 h-full">
      <section className="col-span-10 flex flex-col gap-6 py-8 pl-6 overflow-y-auto scrollbar-hide">
        <WelcomeSection user={user} />
        <MyCoursesSection />
        <AllCoursesSection />
      </section>
      <aside className="col-span-4 overflow-y-scroll scrollbar-hide">
        <div className="flex flex-col gap-6 py-8 pr-6">
          <GraphSection />
          <CalendarSection />
        </div>
      </aside>
    </div>
  );
}