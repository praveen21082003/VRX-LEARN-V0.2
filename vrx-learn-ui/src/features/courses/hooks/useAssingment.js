import { useEffect, useState } from "react"
import { getAssignmentById } from "../../../services/assignmentContent.service";

export default function useAssignment(assignmentId){
    const [assignment, setAssignment] = useState(null);
    const [assignmentError, setAssignmentError] = useState("");
    const [assignmentLoading, setAssignmentLoading] = useState(false);

    useEffect(()=>{
        async function fetchAssignment(){
            try{
                setAssignmentLoading(true);
                const response = await getAssignmentById(assignmentId);
                setAssignment(response);
            }
            catch (error){
                setAssignmentError(error)
            }
            finally{
                setAssignmentLoading(false)
            }
        }
        if (assignmentId) fetchAssignment();

    },[assignmentId]);

    return {assignment, assignmentError, assignmentLoading}
}