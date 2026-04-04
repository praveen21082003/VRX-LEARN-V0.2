import axiosInstance from "./apiClient";

export const createModule = (payload) => {
    return axiosInstance.post('/api/v1/modules/', payload);
}


export const reorderModules = (module_id, params) => {
    return axiosInstance.patch(`/api/v1/modules/${module_id}/update-position`, params,)
}

export const getModuleById = (module_id) => {
    return axiosInstance.get(`/api/v1/modules/${module_id}`)
}

export const updateModuleById = (module_id, payload) => {
    return axiosInstance.patch(`/api/v1/modules/${module_id}`, payload)
}