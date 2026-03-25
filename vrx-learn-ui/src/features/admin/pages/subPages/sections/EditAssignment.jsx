import React, { useState } from 'react'
import { useOutletContext, useParams } from "react-router-dom";
import AssignmentFormSection from '../../../sections/AssignmentFormSection';



function EditAssignment() {

    const { assignmentId } = useParams();
    const { assignments } = useOutletContext();



    const normalizeAssignment = (assignment) => {
        return {
            ...assignment
        };
    };


    if (!assignments) return <p>Assignment not found</p>;


    const assignment = assignments.find(
        (a) => a.id === assignmentId
    );


    const [formData, setFormData] = useState(
        assignment ? normalizeAssignment(assignment) : null
    );
    // console.log(formData)

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };



    return (
        <div>
            <AssignmentFormSection mode="edit" formData={formData} handleChange={handleChange} />
        </div>
    )
}

export default EditAssignment
