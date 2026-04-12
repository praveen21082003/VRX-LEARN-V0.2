import axiosInstance from "./apiClient";

export const getAssignmentContent = (courseId) => {
    return axiosInstance.get(`/api/v1/assignment-contents/trainer/assignments/${courseId}`);
}


export const getAssignmentDetails = (assignmentId) => {
    return axiosInstance.get(`/api/v1/assignment-contents/trainer/contents/${assignmentId}`)
}

export const getAssignmentSubmission = (assignmentId, params) => {
    return axiosInstance.get(
        `/api/v1/assignment-contents/trainer/submissions/${assignmentId}`,
        { params }
    );
};

export const getTraineeAssignmentContent = (courseId) => {
    return axiosInstance.get(`/api/v1/assignment-contents/trainee/assignments/${courseId}`)
}

export const getAssignmentById = (assignmentId) => {
    return axiosInstance.get(`/api/v1/assignment-contents/trainee/contents/${assignmentId}`)
}