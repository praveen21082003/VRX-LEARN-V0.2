import { useEffect, useCallback, useState } from "react"
import { getTraineeAssignmentContent } from "@/services/assignmentContent.service";


export default function useAssignments(courseId) {
    const [assignments, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAssignments = useCallback(async (isSilent = false) => {
        if (!isSilent) setLoading(true);
        console.log("hook refetching");
        try {
            const response = await getTraineeAssignmentContent(courseId);
            setAssignment(response);
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    useEffect(() => {
        if (courseId) fetchAssignments();
    }, [fetchAssignments]);

    return { assignments, refresh: () => fetchAssignments(true), loading };
}