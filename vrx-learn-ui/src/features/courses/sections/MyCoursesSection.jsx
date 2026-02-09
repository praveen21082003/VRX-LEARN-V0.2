import CourseCard from "@/components/ui/CourseCard";
import useMyCourses from "@/features/courses/hooks/useMyCourses";


export default function MyCoursesSection() {

    const { courses, loading } = useMyCourses();

    return (
        <section className="bg-surface rounded-xl p-4">
            <header className="flex justify-between mb-4">
                <h2 className="font-semibold text-2xl">My Courses</h2>
            </header>

            <div className="grid grid-cols-4 gap-4">
                {courses.map(course => (
                    <CourseCard
                        key={course.id}
                        name={course.name}
                        author={course.author}
                        image={course.thumbnail}
                        buttonName = "Start Learning"
                    />
                ))}
            </div>
        </section>
    );
}
