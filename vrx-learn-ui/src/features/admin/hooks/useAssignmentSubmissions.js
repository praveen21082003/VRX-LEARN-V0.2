import { useEffect, useState } from "react";
import { getAssignmentSubmissions } from "@/services/courses.service";

export default function useAssignmentSubmissions(assignmentId) {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSubmissions = async () => {
        if (!assignmentId) return;

        try {
            setLoading(true);
            setError(null);

            const res = await getAssignmentSubmissions(assignmentId);
            setSubmissions(res);
        } catch (err) {
            console.error("Failed to fetch submissions", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, [assignmentId]);

    return {
        submissions,
        loading,
        error,
        refetch: fetchSubmissions
    };
}