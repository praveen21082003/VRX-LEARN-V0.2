import { useCallback, useEffect, useState } from "react";
import { getTrainerAssignedCourses } from "@/services/dashboard.service";

export const useTrainerAssignedCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCourses = useCallback(async () => {

        try {
            setLoading(true)
            const coursesData = await getTrainerAssignedCourses();
            setCourses(coursesData);
            setError(null)
        } catch (err) {
            console.warn(err);
            setError(err);
        } finally {
            setLoading(false);
        }

    }, []);

    return { courses, loading, error, fetchCourses };
}
