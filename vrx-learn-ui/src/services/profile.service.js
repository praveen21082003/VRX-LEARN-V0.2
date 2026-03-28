import axiosInstance from "./apiClient";


export const getUserProfile = (email, password)=>{
    return axiosInstance.post(`api/v1/users/login`, {email,password})
}


export const getMe = () => {
    return axiosInstance.get('/api/v1/users/me');
};