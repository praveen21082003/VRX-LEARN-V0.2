import { useState } from "react";
import { getAssignmentSubmission } from "../../../services/assignments.service";

export default function useAssignment() {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAssignment = async (submissionId) => {
    try {
      setLoading(true);
      const res = await getAssignmentSubmission(submissionId);
      setAssignment(res[0]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    assignment,
    loading,
    error,
    fetchAssignment
  };
}