import { useEffect, useState } from "react";
import { getModuleById } from "../../../services/courses.service";


export default function useModule(moduleId) {
    const [module, setModule] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchModule = async () => {
            try {
                setLoading(true);
                const response = await getModuleById(moduleId);
                setModule(response);
            }
            catch (error) {
                setError(error)
            }
            finally {
                setLoading(false);
            }
        }
        fetchModule();
    },[moduleId])




    return { module, loading, error }
}