import { useState } from "react";
import { DeleteAssignment} from "@/services/courses.service";

export default function useDeleteAssignment() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteAssignment = async (id) => {
        try {
            setLoading(true);
            const response = await DeleteAssignment(id);
            return response.data;
            
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteAssignment, loading, error };
}
