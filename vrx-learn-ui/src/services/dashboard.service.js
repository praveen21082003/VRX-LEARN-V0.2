import axiosInstance from './apiClient'

export const getEnrolledCourses = () => {
    return axiosInstance.get('/api/v1/dashboard/trainee/enrolled-courses')
}

export const getCurrentCourse = () => {
    return axiosInstance.get('/api/v1/dashboard/trainee/current-course')
}

export const getTrainerKpis = () => {
    return axiosInstance.get('/api/v1/dashboard/trainer/kpis')
}

export const getTrainerAssignedCourses = () => {
    return axiosInstance.get('/api/v1/dashboard/trainer/assigned-courses')
}

export const getAdminKpis = () => {
    return axiosInstance.get("/api/v1/dashboard/admin/kpis");
};

export const getAdminTopCourses = () => {
    return axiosInstance.get(`/api/v1/dashboard/admin/top-enrolled-courses?n=5`);
};