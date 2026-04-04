import axiosInstance from "./apiClient";


export const createUsers = (payload) => {
    return axiosInstance.post('api/v1/users', payload)
}
