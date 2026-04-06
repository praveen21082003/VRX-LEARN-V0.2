import { createCourseService, updateCourseInfo, deleteCourse } from "@/services/courses.service";
import { useCallback, useState } from "react";


export default function useCourses() {
    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState(null);

    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const createCourse = useCallback(async (payload) => {
        setIsCreating(true);
        setCreateError(null);
        try {
            const res = await createCourseService(payload);
            return res;
        } catch (err) {
            const msg =
                err.response?.data?.message || err.message || "Failed to create course";
            setCreateError(msg);
            throw err;
        } finally {
            setIsCreating(false);
        }
    }, []);


    const updateCourse = useCallback(async (courseId, payload) => {
        setIsUpdating(true);
        setUpdateError(null);

        try {
            const res = await updateCourseInfo(courseId, payload);
            return res;
        } catch (err) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.detail ||
                err.message ||
                "Failed to update course";

            setUpdateError(msg);
            throw err;
        } finally {
            setIsUpdating(false);
        }
    }, []);

    const deleteCourseById = useCallback(async (courseId) => {
        setIsDeleting(true);
        setDeleteError(null);

        try {
            const res = await deleteCourse(courseId);
            return res;
        } catch (err) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.detail ||
                err.message ||
                "Failed to delete course";

            setDeleteError(msg);
            throw err;
        } finally {
            setIsDeleting(false);
        }
    }, []);

    return {
        createCourse,
        updateCourse,
        deleteCourseById,

        isCreating,
        createError,

        isUpdating,
        updateError,

        isDeleting,
        deleteError,
    }
}