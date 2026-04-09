import axiosInstance from "./apiClient";


export const createLesson = (payload) => {
    return axiosInstance.post('/api/v1/lessons/', payload);
}

export const getLessonsById = (moduleId) => {
    return axiosInstance.get(`/api/v1/list/trainer/lessons/${moduleId}`)
}

export const updateLesson = (lessonId, payload) => {
    return axiosInstance.patch(`/api/v1/lessons/${lessonId}/update`, payload)
}

export const getLessonById = (lessonId) => {
    return axiosInstance.get(`/api/v1/lessons/${lessonId}`)
}

export const deleteLessonById = (lessonId) => {
    return axiosInstance.delete(`/api/v1/lessons/${lessonId}`)
}

export const reorderLessons = (lessonId, params) => {
    return axiosInstance.patch(`/api/v1/lessons/${lessonId}/update-position`, params)
}

