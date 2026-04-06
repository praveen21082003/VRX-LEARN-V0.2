import axiosInstance from './apiClient'


export const searchUser = (params) => {
    return axiosInstance.get(`api/v1/admin/search/users`, {
        params: params
    },)
}

export const searchCourse = (query) => {
    return axiosInstance.get(`/api/v1/admin/search/courses?course_name=${query}`)
}