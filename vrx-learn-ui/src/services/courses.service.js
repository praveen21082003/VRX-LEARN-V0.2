import axiosInstance from "./apiClient";

/* My Courses */
export const getMyCourses = () => {
  return axiosInstance.get("/my_courses");
};

/* All Courses */
export const getAllCourses = () => {
  return axiosInstance.get("/all_courses");
};

/* Course Overview */
export const getCourseContent = (courseId) => {
  return axiosInstance.get(`/course_details/${courseId}`);
};

/* Modules + Lesson List (SIDEBAR) */
export const getCourseModules = (courseId) => {
  return axiosInstance.get(`/modules?course_id=${courseId}`);
};

/* Single Lesson Content */
export const getLessonById = (lessonId) => {
  return axiosInstance.get(`/lessons/${lessonId}`);
};

/* Assignments */
export const getAssignments = (courseId) => {
  return axiosInstance.get(`/assignments?course_id=${courseId}`);
};


/* Single Assignment */
export const getAssignmentId = (assignmentId) => {
  return axiosInstance.get(`/assignments/${assignmentId}`);
};

