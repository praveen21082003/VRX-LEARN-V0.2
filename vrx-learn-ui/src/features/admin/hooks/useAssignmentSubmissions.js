import { use, useCallback, useEffect, useState } from "react";
import { getAssignmentSubmission } from "@/services/assignmentContent.service";
import { getSubmission, patchSubmissionGrade } from "@/services/assignmentSubmissions.service";

export default function useAssignmentSubmissions(assignmentId, params) {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [submitedData, setSubmittedData] = useState([]);
    const [submissionLoading, setSubmissionLoading] = useState(false);

    const [gradeData, setGradeData] = useState(null);
    const [grading, setGrading] = useState(false);

    const fetchSubmissions = async () => {
        if (!assignmentId) return;
        setLoading(true);
        setError(null);

        try {
            const res = await getAssignmentSubmission(assignmentId, params);
            setSubmissions(res);
        } catch (err) {
            console.error("Failed to fetch submissions", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchSubmitionData = async (submissionId) => {
        if (!submissionId) return;
        setSubmissionLoading(true);
        setError(null)
        try {
            const response = await getSubmission(submissionId);
            setSubmittedData(response);
        }
        catch (error) {
            console.warn(error);
            throw error
        }
        finally {
            setSubmissionLoading(false);
        }
    }

    const gradeSubmission = useCallback(async (submissionId, payload) => {
        setGrading(true);
        setGradeData(null)
        try {
            const res = await patchSubmissionGrade(submissionId, payload)
            setGradeData(res)
            return res
        }
        catch (error) {
            throw error
        }
        finally {
            setGrading(false);
        }
    },[])

    useEffect(() => {
        fetchSubmissions();
    }, [assignmentId, params]);

    return {
        submissions,
        loading,
        error,
        refetch: fetchSubmissions,

        submitedData,
        submissionLoading,
        fetchSubmitionData,

        gradeData,
        grading,
        gradeSubmission,
    };
}