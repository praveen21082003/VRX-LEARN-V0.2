import { useState, useEffect, useCallback } from "react";
import { getAssignmentContent, getAssignmentDetails } from "@/services/assignmentContent.service";

export default function useAssignmentContent() {
    const [assignments, setAssignments] = useState([]);
    const [assignment, setAssignment] = useState(null);

    const [loading, setLoading] = useState(false);
    const [detailsLoading, setDetailsLoading] = useState(false);

    const [error, setError] = useState(null);
    const [detailsError, setDetailsError] = useState(null);

    const fetchAssignments = useCallback(async (courseId) => {
        if (!courseId) return;

        try {
            setLoading(true);
            setError(null);

            const response = await getAssignmentContent(courseId);

            const data = Array.isArray(response) ? response : [];
            setAssignments(data);

        } catch (err) {
            console.error(err);
            setError(
                err?.response?.status === 404
                    ? "Assignments not found"
                    : "Failed to fetch assignments"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAssignmentDetails = useCallback(async (assignmentId) => {
        console.log("hook",assignmentId)
        if (!assignmentId) return;

        try {
            setDetailsLoading(true);
            setDetailsError(null);

            const response = await getAssignmentDetails(assignmentId);
            console.log("data",response)

            setAssignment(response);
        } catch (err) {
            console.error(err);
            setDetailsError(
                err?.response?.status === 404
                    ? "Assignment not found"
                    : "Failed to fetch assignment details"
            );
        } finally {
            setDetailsLoading(false);
        }
    }, []);


    return {
        assignments,
        setAssignments,
        assignment,

        loading,
        detailsLoading,

        error,
        detailsError,

        fetchAssignments,
        fetchAssignmentDetails,
    };
} 