import CourseCard from "@/components/ui/CourseCard";
import useMyCourses from "@/features/courses/hooks/useMyCourses";


export default function MyCoursesSection() {

    const { courses, loading } = useMyCourses();
    const top3 = courses.slice(0, 3);
    return (
        <section className="bg-surface p-4 flex-[0_0_40%] bg-card rounded-xl">
            <header className="flex justify-between mb-4">
                <h2 className="text-h4">My Courses</h2>
                <button className="text-sm underline">View all</button>
            </header>

            <div className="grid grid-cols-3 gap-4">
                {top3.map(course => (
                    <CourseCard
                        key={course.id}
                        name={course.name}
                        author={course.author}
                        image={course.thumbnail}
                        buttonName = "Start Learning"
                        bgClass="bg-[var(--color-primary)]"
                        textClass= "text-white"
                        
                    />
                ))}
            </div>
        </section>
    );
}
