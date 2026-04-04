import { useState } from "react";
import { createEnrollment } from '@/services/enrollments.service'

export const useCreateEnrollments = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createNewEnrollment = async (payload) => {
        try {
            setLoading(true);
            setError(null);

            const res = await createEnrollment(payload);

            return res.data;
        } catch (err) {
            const message =
                err.response?.data?.message || "Failed to create user";

            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    return { createNewEnrollment, loading, error }
}