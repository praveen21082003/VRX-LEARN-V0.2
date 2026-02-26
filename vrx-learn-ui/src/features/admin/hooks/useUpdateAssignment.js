import { useState } from "react";
import { updateAssignment as updateAssignmentDeatails } from "@/services/courses.service";

export default function useUpdateAssignment() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateAssignemt = async (id, playload) => {
        try {
            setLoading(true);
            const response = await updateAssignmentDeatails(id, playload);
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
