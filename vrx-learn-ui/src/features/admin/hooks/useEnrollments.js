import { useState, useCallback } from "react";
import {
    createEnrollment as createEnrollmentService,
    updateEnrollment as updateEnrollmentService,
    deleteEnrollment as deleteEnrollmentService
} from '@/services/enrollments.service';

export const useEnrollments = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState(null);

    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);



    const [updateError, setUpdateError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

    const createEnrollment = useCallback(async (payload) => {
        setIsCreating(true);
        setCreateError(null);

        try {
            const res = await createEnrollmentService(payload);
            return res;
        } catch (err) {
            const message =
                err.response?.data?.message || "Failed to create enrollment";

            setCreateError(message);
            throw err;
        } finally {
            setIsCreating(false);
        }
    }, []);

    const updateEnrollment = useCallback(async (id, payload) => {
        setIsUpdating(true);
        setUpdateError(null);

        try {
            const res = await updateEnrollmentService(id, payload);
            return res;
        } catch (err) {
            console.log(err)
            const message =
                err.response?.data?.message ||
                err.response?.data?.detail ||
                "Failed to update enrollment";

            setUpdateError(message);
            throw err;
        } finally {
            setIsUpdating(false);
        }
    }, []);


    const DeleteEnrollment = useCallback(async (enrollmentId) => {
        setIsDeleting(true);
        setDeleteError(null);

        try {
            const res = await deleteEnrollmentService(enrollmentId);
            return res;
        } catch (error) {
            const msg =
                error.response?.data?.message ||
                error.response?.data?.detail ||
                error.message ||
                "Enrollment not deleted. Something went wrong";

            setDeleteError(msg);
            throw error;
        } finally {
            setIsDeleting(false);
        }
    }, []);

    return {
        createEnrollment,
        updateEnrollment,
        DeleteEnrollment,

        isCreating,
        createError,

        isUpdating,
        updateError,

        isDeleting,
        deleteError

    };
};