import { useEffect, useState } from "react";
import { getCourseContent } from "@/services/courses.service";

export default function useCourseContent(courseId) {
    const [courseContent, setCourseContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function fetchCourseContent() {
            try {
                const courseDeatails = await getCourseContent(courseId)
                setCourseContent(courseDeatails);
            } catch (error) {
                console.warn(error)
                setError(err);
            } finally{
                setLoading(false);
            }
        }
        fetchCourseContent();
    }, [])

    return { courseContent };
}