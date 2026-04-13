import { useState } from 'react'
import { createModule as createModuleService } from '@/services/modules.service';

export default function useCreateModule() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createModule = async (payload) => {
        try {
            setLoading(true);
            const response = await createModuleService(payload);
            return response;
        }
        catch (error) {
            setError(error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    return { createModule, error, loading }
}
