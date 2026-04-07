import axiosInstance from './apiClient'

export const getCourseOverview = (courseId, type) => {
    return axiosInstance.get(`/api/v1/${type}/course-overview/${courseId}`);;
};


export const getCourseContent = (courseId) =>{
    return axiosInstance.get(`/api/v1/course-contents/trainer/${courseId}`)
}
