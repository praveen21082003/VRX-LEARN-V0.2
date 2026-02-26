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

export const updateCourseContent = (courseId, payload) => {
  return axiosInstance.patch(`/course_details/${courseId}`, payload);
}

/* Modules + Lesson List (SIDEBAR) */
export const getCourseModules = (courseId) => {
  return axiosInstance.get(`/modules?course_id=${courseId}`);
};

export const getModuleById = (moduleId) => {
  return axiosInstance.get(`/modules/${moduleId}`)
}

export const createModule = (playload) => {
  return axiosInstance.post('/modules', playload);
}

export const updateModule = (moduleId, playload) => {
  return axiosInstance.patch(`/modules/${moduleId}`, playload)
}

export const deleteModuleById = (moduleId) => {
  return axiosInstance.delete(`/modules/${moduleId}`)
}

/* Single Lesson Content */
export const getLessonById = (lessonId) => {
  return axiosInstance.get(`/lessons/${lessonId}`);
};
export const updateLesson = (lessonId, playload) => {
  return axiosInstance.patch(`/modules/${lessonId}`, playload)
}

/* Assignments */
export const getAssignments = (courseId) => {
  return axiosInstance.get(`/assignments?course_id=${courseId}`);
};

export const createAssignment = (playload) => {
  return axiosInstance.post('/assignments', playload)
}


/* Single Assignment */
export const getAssignmentId = (assignmentId) => {
  return axiosInstance.get(`/assignments/${assignmentId}`);
};

/* Update assignemnt by id*/
export const updateAssignment = (assignmentId,playload) => {
  return axiosInstance.patch(`/assignments/${assignmentId}`,playload)
}

export const DeleteAssignment = (assignmentId) => {
  return axiosInstance.delete(`/assignments/${assignmentId}`)
}



