import { CourseCardViewer } from '@/components/ui'
import useAllCourses from "@/features/courses/hooks/useAllCourses";


export default function AllCoursesSection() {

    const { courses, loading } = useAllCourses();

    return (
        <CourseCardViewer
            title="All Courses"
            courses={courses}
            gridSize={4}
        />
    );
}
