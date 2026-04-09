import { useEffect, useState } from "react";
import { getAssignmentSubmission } from "@/services/assignmentContent.service";

export default function useAssignmentSubmissions(assignmentId, params) {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSubmissions = async () => {
        if (!assignmentId) return;

        try {
            setLoading(true);
            setError(null);

            const res = await getAssignmentSubmission(assignmentId, params);
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
    }, [assignmentId, params]);

    return {
        submissions,
        loading,
        error,
        refetch: fetchSubmissions
    };
}