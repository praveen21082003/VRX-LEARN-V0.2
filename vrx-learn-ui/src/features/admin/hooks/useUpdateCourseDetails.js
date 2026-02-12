import { useState } from "react";
import { updateCourseContent } from "@/services/courses.service";

export default function useUpdateCourseDetails() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCourse = async (id, payload) => {
        try {
            setLoading(true);
            const response = await updateCourseContent(id, payload);
            return response.data;
            
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateCourse, loading, error };
}
