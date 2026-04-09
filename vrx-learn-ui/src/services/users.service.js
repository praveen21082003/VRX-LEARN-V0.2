import axiosInstance from "./apiClient";


export const createUsers = (payload) => {
    return axiosInstance.post('api/v1/users', payload)
}

export const deleteUserService = (userId) => {
    return axiosInstance.delete(`/api/v1/users/${userId}`)
}


export const userLogout = () =>{
    return axiosInstance.post('/api/v1/users/logout')
}