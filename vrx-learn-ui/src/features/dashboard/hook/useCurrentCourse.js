import { getCurrentCourse } from "@/services/dashboard.service";
import { useCallback, useState } from "react";


export const useCurrentCourse = () => {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchCurrentCourse = useCallback(async() => {
        try {
            setLoading(true);
            setError(null);
            const res = await getCurrentCourse();
            setCourse(res);

            return res;
        } catch (err) {
            setError(err.details.msg)
            setCourse(null);
        }
        finally{
            setLoading(false);
        }

    }, [])

    return {course, loading, error, fetchCurrentCourse}
}