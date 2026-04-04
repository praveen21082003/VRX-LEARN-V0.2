import { reorderModules } from "@/services/modules.service";
import { useCallback, useState } from "react";

export const useReorderModules = () => {
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);


    const reorder = useCallback(async(moduleId,params = {})=>{
        
        try{
            console.log(moduleId,params)
            setIsUpdating(true);
            const res = await reorderModules(moduleId, params);
            setError(null);
        }
        catch(err){
            setError(err);
        }
        finally{
            setIsUpdating(false);
        }
    },[]);

    return {
        error,
        isUpdating,
        reorder
    }
}