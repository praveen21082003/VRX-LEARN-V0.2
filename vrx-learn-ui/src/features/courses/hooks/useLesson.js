import { useEffect, useState, useCallback } from "react";
import { getLessonById } from "@/services/lessons.service";

export default function useLesson(lessonId) {
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchLesson = useCallback(async () => {
        if (!lessonId) return;

        try {
            setLoading(true);
            setError(null);

            const response = await getLessonById(lessonId);
            setLesson(response);
        } catch (err) {
            console.warn(err);
            setError(err?.response?.data?.message || "Failed to fetch lesson");
        } finally {
            setLoading(false);
        }
    }, [lessonId]);

    useEffect(() => {
        fetchLesson();
    }, [fetchLesson]);

    return {
        lesson,
        loading,
        error,
        refetch: fetchLesson,
    };
}