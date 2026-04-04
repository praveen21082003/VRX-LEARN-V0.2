
import { CourseCardViewer } from '@/components/ui'
import useAllCourses from "@/features/courses/hooks/useAllCourses";


export default function AllCoursesSection() {

    const { courses, loading } = useAllCourses();

    return (
        <CourseCardViewer
            loading={loading}
            title="All Courses"
            courses={courses}
            maxCourses={3}
        />
    );
}
