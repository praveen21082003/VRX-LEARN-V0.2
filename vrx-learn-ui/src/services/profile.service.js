import axiosInstance from "./apiClient";


export const getUserProfile = (email, password)=>{
    return axiosInstance.get(`/users?email=${email}&password=${password}`)
}