import { CourseCardViewer } from '@/components/ui'
import useMyCourses from "@/features/courses/hooks/useMyCourses";


export default function MyCoursesSection() {

    const { courses, loading } = useMyCourses();

    return (
        <CourseCardViewer
            myCourses={true}
            loading={loading}
            title="My Courses"
            courses={courses}
            maxCourses={3}
            getButtonName={(course) =>
                course.progress === 0 ? "Start Learning" : "Resume"
            }
        />
    );
}
