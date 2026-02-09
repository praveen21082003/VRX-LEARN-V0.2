import { useEffect, useState } from "react";
import { getGraphData } from "@/services/graph.service";

export default function useGraphData() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getGraphData();
                setData(response);
            } catch (error) {
                setError(error);
            } finally{
                setLoading(false);
            }
        }
        fetchData();
    },[])

    return {data, error, loading}
}