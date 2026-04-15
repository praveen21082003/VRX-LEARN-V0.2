import { useEffect, useState } from "react"
import { getAssignmentById } from "../../../services/assignmentContent.service";

export default function useAssignment(assignmentId) {
    const [assignment, setAssignment] = useState(null);
    const [assignmentError, setAssignmentError] = useState("");
    const [assignmentLoading, setAssignmentLoading] = useState(false);

    useEffect(() => {
        async function fetchAssignment() {
            setAssignmentLoading(true);
            setAssignmentError("");

            try {
                const response = await getAssignmentById(assignmentId);
                setAssignment(response);
            } catch (error) {
                setAssignmentError(error.message || "Failed to fetch assignment");
            } finally {
                setAssignmentLoading(false);
            }
        }

        if (assignmentId) {
            fetchAssignment();
        } else {
            setAssignment(null);
        }
    }, [assignmentId]);

    return { assignment, assignmentError, assignmentLoading };
}