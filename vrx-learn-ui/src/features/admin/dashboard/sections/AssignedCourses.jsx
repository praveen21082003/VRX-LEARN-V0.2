import { CourseCardViewer } from "@/components/ui"
import useMyCourses from "@/features/courses/hooks/useMyCourses";

export default function AssignedCourses() {
    
    const { courses, loading } = useMyCourses();

    return (
        <CourseCardViewer
            title="Assigned Courses"
            courses={courses}
            gridSize={4}
        />
    )
}