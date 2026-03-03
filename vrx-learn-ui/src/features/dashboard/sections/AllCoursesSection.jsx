import CourseCard from "@/components/ui/CourseCard";
import useAllCourses from "@/features/courses/hooks/useAllCourses";


export default function AllCoursesSection() {

    const { courses, loading } = useAllCourses();
    const top3 = courses.slice(0, 3);
    return (
        <section className="bg-surface p-6 flex-[0_0_15%] bg-card rounded-xl ">
            <header className="flex justify-between mb-4">
                <h2 className="text-h4">All Courses</h2>
                <button className="text-sm underline">View all</button>
            </header>

            <div className="grid grid-cols-3 gap-4">
                {top3.map(course => (
                    <CourseCard
                        key={course.id}
                        name={course.name}
                        author={course.author}
                        image={course.thumbnail}
                        buttonName="View Details"
                        bgClass="bg-white"
                        textClass="text-black"
                    />
                ))}
            </div>
        </section>
    );
}
