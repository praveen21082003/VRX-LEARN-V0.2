import { CourseCardViewer } from "@/components/ui"
import { useTrainerAssignedCourses } from '../../hooks/useTrainerAssignedCourses'
import { useEffect } from "react";

export default function AssignedCourses() {

    const { courses, loading, error, fetchCourses } = useTrainerAssignedCourses();

    useEffect(() => {
        fetchCourses();
    }, []);

    console.log(courses);


    return (
        <CourseCardViewer
            loading={loading}
            title="Assigned Courses"
            courses={courses}
            gridSize={4}
            vertical={true}
            myCourses={true}
        />
    )
}