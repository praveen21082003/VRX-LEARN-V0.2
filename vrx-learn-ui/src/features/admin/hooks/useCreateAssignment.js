import { useState } from 'react'
import { createAssignment as createAssignmentService } from '@/services/courses.service';

export default function useCreateAssignment() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createAssignment = async (payload) => {
        try {
            setLoading(true);
            const response = await createAssignmentService(payload);
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

    return { createAssignment, error, loading }
}