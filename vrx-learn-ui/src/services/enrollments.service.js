import axiosInstance from "./apiClient";

export const createEnrollment = (payload) => {
    return axiosInstance.post('/api/v1/enrollments', payload);
}


export const searchByUserOrEmail = (query) => {
    return axiosInstance.get(`/api/v1/list/admin/users?nameOrEmail=${query}`)
}

export const searchByCourse = (query) => {
    return axiosInstance.get(`api/v1/list/admin/courses?courseNameOrTrainerName=${query}`)
}

