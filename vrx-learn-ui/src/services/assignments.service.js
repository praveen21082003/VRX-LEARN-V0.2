import axiosInstance from "./apiClient";



export const getAssignmentSubmission = (submissionId) => {
    return axiosInstance.get(
        `/assignment_submissions?id=${submissionId}`
    );
};
