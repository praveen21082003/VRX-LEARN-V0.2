import axiosInstance from "./apiClient"

export const getGraphData = ()=>{
    return axiosInstance.get("/graph");
}