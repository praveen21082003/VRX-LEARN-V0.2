import { useCallback, useState } from "react";
import { updateLesson as updateLessonDeatails, deleteLessonById } from "@/services/lessons.service";

export default function useUpdateLesson() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [isDeleteingLesson, setIsDeleteingLesson] = useState(false);

    const updateLesson = async (id, playload) => {
        try {
            setLoading(true);
            const response = await updateLessonDeatails(id, playload);
            return response.data;

        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteLesson = useCallback(async (id) => {
        setIsDeleteingLesson(true);

        try {
            await deleteLessonById(id);
        }
        catch (error) {
            throw error
        }
        finally {
            setIsDeleteingLesson(false);
        }

    }, [])

    return { updateLesson, deleteLesson, isDeleteingLesson, loading, error };
}
