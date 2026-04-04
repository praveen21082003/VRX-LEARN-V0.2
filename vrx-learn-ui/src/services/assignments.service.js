import axiosInstance from "./apiClient";

export const createAssignment = (payload) => {
    return axiosInstance.post('/api/v1/assignments/', payload)
}

export const getAssignment = (assignmentId) => {
    return axiosInstance.get(`/api/v1/assignments/${assignmentId}`)
}


export const updateAssignmentById = (assignmentId, payload) => {
    return axiosInstance.patch(`/api/v1/assignments/${assignmentId}/update-details`, payload)
}

export const getAssignmentSubmission = (submissionId) => {
    return axiosInstance.get(
        `/assignment_submissions?id=${submissionId}`
    );
};
