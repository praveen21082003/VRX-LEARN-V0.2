import { useState } from "react";
import { updateLesson as updateLessonDeatails } from "@/services/courses.service";

export default function useUpdateLesson() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    return { updateLesson, loading, error };
}
