import axiosInstance from "./apiClient"


export const createSubmission = (payload) => {
    return axiosInstance.post('/api/v1/assignment-submission/', payload)
}

export const getSubmission = (submissionId) => {
    return axiosInstance.get(`/api/v1/assignment-submission/${submissionId}`)
}

export const patchSubmissionGrade = (submissionId, payload) => {
    return axiosInstance.patch(`/api/v1/assignment-submission/${submissionId}/verify`, payload)
}