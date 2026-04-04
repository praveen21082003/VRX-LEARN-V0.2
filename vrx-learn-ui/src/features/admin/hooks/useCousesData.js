import { getCourses } from "@/services/adminListView.service";
import { useState, useCallback } from "react";

export const useCoursesData = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);

    const fetchCourses = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);

            const res = await getCourses(params);

            setCourses(res.data || []);
            setTotal(res.totalItems || 0);
            console.log(res);
            return res.data;
        }
        catch (error) {
            setError(error.response?.data?.message || "Failed to fetch users");
            setCourses([]);
        }
        finally {
            setLoading(false);
        }
    }, []);

    return {
        courses,
        loading,
        error,
        fetchCourses,
        total
    };

}