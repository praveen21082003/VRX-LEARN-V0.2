import { useEffect, useState } from "react"
import { getAssignments } from "@/services/courses.service";


export default function useAssignments(courseId){
    const [assignments, setAssignment] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function fetchAssignments(){
            try{
                const response = await getAssignments(courseId);
                setAssignment(response);
            }
            catch(error){
                setError(error);
            }
            finally{
                setLoading(false);
            }
        }
        if (courseId) fetchAssignments();
    },[courseId])

    return{ assignments, error, loading}
}