import { CourseCardViewer } from '@/components/ui'
import useMyCourses from "@/features/courses/hooks/useMyCourses";


export default function MyCoursesSection() {

    const { courses, loading } = useMyCourses();

    return (
        <CourseCardViewer
            title="My Courses"
            courses={courses}
            gridSize="4"
        />
    );
}
