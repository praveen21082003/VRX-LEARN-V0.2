import axiosInstance from "./apiClient";

export const createModule = (payload) => {
    return axiosInstance.post('/api/v1/modules/', payload);
}


export const reorderModules = (moduleId, params) => {
    return axiosInstance.patch(`/api/v1/modules/${moduleId}/update-position`, params,)
}

export const getModuleById = (module_id) => {
    return axiosInstance.get(`/api/v1/modules/${module_id}`)
}

export const updateModuleById = (module_id, payload) => {
    return axiosInstance.patch(`/api/v1/modules/${module_id}`, payload)
}

export const deleteModuleById = (moduleId) => {
    return axiosInstance.delete(`/api/v1/modules/${moduleId}`)
}