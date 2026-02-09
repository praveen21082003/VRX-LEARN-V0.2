import axiosInstance from "./apiClient";


export const getUserProfile = ()=>{
    return axiosInstance.get('/users/1')
}