import { useEffect, useState } from "react";
import { getLessonById } from "@/services/courses.service";

export default function useLessons(lessonId) {
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!lessonId) return;

        async function fetchLesson() {
            try {
                setLoading(true);
                const response = await getLessonById(lessonId);
                console.log(response);
                setLesson(response);
            } catch (err) {
                console.warn(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchLesson();
    }, [lessonId]);

    return { lesson, loading, error };
}
