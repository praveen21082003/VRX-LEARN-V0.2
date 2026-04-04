import axiosInstance from "./apiClient";

export const updateMediaStatus = (mediaId)=>{
    return axiosInstance.patch(`/api/v1/media/${mediaId}/update-status`)
}