import { useState } from "react";
import { updateAssignmentById } from '@/services/assignments.service'

export default function useUpdateAssignment() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateAssignemt = async (id, playload) => {
        try {
            setLoading(true);
            const response = await updateAssignmentById(id, playload);
            return response.data;

        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateAssignemt, loading, error };
}
