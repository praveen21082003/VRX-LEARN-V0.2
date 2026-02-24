import { useState } from "react";
import { deleteModuleById } from "@/services/courses.service";

export default function useDeleteMoudule() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteModule = async (id) => {
        try {
            setLoading(true);
            const response = await deleteModuleById(id);
            return response.data;
            
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteModule, loading, error };
}
