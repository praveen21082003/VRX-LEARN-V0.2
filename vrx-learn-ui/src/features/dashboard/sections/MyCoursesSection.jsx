import { CourseCardViewer } from '@/components/ui'
import useMyCourses from "@/features/courses/hooks/useMyCourses";


export default function MyCoursesSection({ darkMode }) {

    const { courses, loading } = useMyCourses();

    return (
        <CourseCardViewer
            title="My Courses"
            courses={courses}
            maxCourses={3}
            getButtonName={(course) =>
                course.progress === 0 ? "Start Learning" : "Resume"
            }
        />
    );
}
