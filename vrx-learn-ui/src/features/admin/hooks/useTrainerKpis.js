import { getTrainerKpis } from "@/services/dashboard.service";
import { useCallback, useState } from "react";

export const useTrainerKpis = () => {
    const [kpisData, setKpisData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchKpis = useCallback(async()=>{
        try{
            setLoading(true);
            setError(null);
            const res = await getTrainerKpis();
            setKpisData(res);
        }
        catch(error) {
            setError(error)
            setKpisData(null);
        }
        finally{
            setLoading(false);
        }
    },[])

    return{
        kpisData,
        loading,
        error,
        fetchKpis
    }

}