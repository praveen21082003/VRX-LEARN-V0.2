import { reorderModules as reorderModulesService } from "@/services/modules.service";
import { reorderLessons as reorderLessonsService} from '@/services/lessons.service'
import { useCallback, useState } from "react";

export const useReorder = () => {
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);


    const reorderModules = useCallback(async (moduleId, params = {}) => {
        setIsUpdating(true);
        try {
            const res = await reorderModulesService(moduleId, params);
            setError(null);
            return res
        }
        catch (err) {
            setError(err);
            throw err; 
        }
        finally {
            setIsUpdating(false);
        }
    }, []);

    const reorderLessons = useCallback(async (lessonId, params = {}) => {
        setIsUpdating(true);
        try {
            const res = await reorderLessonsService(lessonId, params);
            setError(null);
        }
        catch (err) {
            setError(err);
        }
        finally {
            setIsUpdating(false);
        }
    }, []);



    return {
        error,
        isUpdating,
        reorderModules,
        reorderLessons
    }
}