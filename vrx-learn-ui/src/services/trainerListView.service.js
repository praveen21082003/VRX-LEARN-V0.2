import axiosInstance from "./apiClient";


export const getTraineeRoster = (courseId)=>{
    return axiosInstance.get(`/api/v1/list/trainer/trainees/${courseId}`)
}