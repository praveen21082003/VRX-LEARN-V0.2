import axiosInstance from "./apiClient";


export const createCourseService = (payload) => {
  return axiosInstance.post('/api/v1/courses/', payload)
}


// All Courses
export const getAllCourses = () => {
  return axiosInstance.get(`/api/v1/dashboard/trainee/top-new-courses/${3}`);
};


// Update Base course info
export const updateCourseInfo = (course_id, payload) => {
  return axiosInstance.patch(`/api/v1/courses/update-basic-info/${course_id}`, payload)
}

export const deleteCourse = (courseId) => {
  return axiosInstance.delete(`/api/v1/courses/${courseId}`)
}





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

export const getAssignmentSubmissions = (assignmentId) => {
  return axiosInstance.get(`/assignment_submissions?assignment_id=${assignmentId}`);
};

export const createAssignment = (playload) => {
  return axiosInstance.post('/assignments', playload)
}


/* Single Assignment */
export const getAssignmentId = (assignmentId) => {
  return axiosInstance.get(`/assignments/${assignmentId}`);
};

/* Update assignemnt by id*/
export const updateAssignment = (assignmentId, playload) => {
  return axiosInstance.patch(`/assignments/${assignmentId}`, playload)
}

export const DeleteAssignment = (assignmentId) => {
  return axiosInstance.delete(`/assignments/${assignmentId}`)
}



