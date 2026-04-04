import axiosInstance from './apiClient'

export const getEnrolledCourses = ( )=>{
    return axiosInstance.get('/api/v1/dashboard/trainee/enrolled-courses')
}

export const getCurrentCourse = ( )=>{
    return axiosInstance.get('/api/v1/dashboard/trainee/current-course')
}

export const getTrainerKpis = ( )=>{
    return axiosInstance.get('/api/v1/dashboard/trainer/kpis')
}

export const getTrainerAssignedCourses = ( )=>{
    return axiosInstance.get('/api/v1/dashboard/trainer/assigned-courses')
}