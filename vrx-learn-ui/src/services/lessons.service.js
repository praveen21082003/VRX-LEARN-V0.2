import axiosInstance from "./apiClient";


export const createLesson = (payload) => {
    return axiosInstance.post('/api/v1/lessons/', payload);
}

export const getLessonsById = (moduleId) => {
    return axiosInstance.get(`/api/v1/list/trainer/lessons/${moduleId}`)
}