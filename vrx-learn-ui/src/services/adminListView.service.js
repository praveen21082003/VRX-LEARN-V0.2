import axiosInstance from "./apiClient";

export const getUsers = (params = {}) => {
    return axiosInstance.get('/api/v1/list/admin/users', {
        params,
    })
}

export const getEnrollments = (params = {}) => {
    return axiosInstance.get('/api/v1/list/admin/enrollments', {
        params,
    } )
}

export const getCourses = (params = {})=>{
    return axiosInstance.get('/api/v1/list/admin/courses',{
        params,
    })
}
