import { useState } from "react";
import { updateModule as updateModuleDeatails } from "@/services/courses.service";

export default function useUpdateMoudule() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateModule = async (id, playload) => {
        try {
            setLoading(true);
            const response = await updateModuleDeatails(id, playload);
            return response.data;
            
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateModule, loading, error };
}
