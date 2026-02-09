import { getEvevnts } from "@/services/calender.service"
import { useEffect, useState } from "react"

export default function useEvents(){
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")


    useEffect(()=>{
        async function fetchEvents() {
            try{
                const responce = await getEvevnts();
                setEvents(responce);
            }
            catch (error){
                setError(error);
            }
            finally{
                setLoading(false);
            } 
        }

        fetchEvents();

    },[])
    return {events, loading, error}
}