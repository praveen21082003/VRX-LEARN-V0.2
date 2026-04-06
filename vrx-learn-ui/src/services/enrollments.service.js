import axiosInstance from "./apiClient";

export const createEnrollment = (payload) => {
    return axiosInstance.post('/api/v1/enrollments/', payload);
}


export const searchByUserOrEmail = (query) => {
    return axiosInstance.get(`/api/v1/list/admin/users?nameOrEmail=${query}`)
}

export const searchByCourse = (query) => {
    return axiosInstance.get(`api/v1/list/admin/courses?courseNameOrTrainerName=${query}`)
}

export const updateEnrollment = (id, payload) => {
    return axiosInstance.patch(`/api/v1/enrollments/${id}/update-status`, payload);
};


export const deleteEnrollment = (enrollmentId) => {
    return axiosInstance.delete(`/api/v1/enrollments/${enrollmentId}`)
}

