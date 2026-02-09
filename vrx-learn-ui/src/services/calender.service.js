import axiosInstance from "./apiClient"

export const getEvevnts = async ()=>{
    return axiosInstance.get('/events')
}