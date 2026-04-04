import axiosInstance from './apiClient'


export const getCourseContent = (courseId) =>{
    return axiosInstance.get(`/api/v1/course-contents/trainer/${courseId}`)
}