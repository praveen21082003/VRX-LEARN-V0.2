import React, { useState } from 'react'
import { useOutletContext, useParams } from "react-router-dom";
import AssignmentFormSection from '../../../sections/AssignmentFormSection';
import useAssignment from '../../../hooks/useAssignment';



function EditAssignment() {

    const { assignmentId } = useParams();
    const { assignment, assignmentLoading, assignmentError, addToast } = useOutletContext();
    console.log(assignment)

    const { updateAssignment, isUpdating, updateError, } = useAssignment();

    const { assignment: assignmentData, attachment } = assignment || {};



    const normalizeAssignment = (assignment) => {
        return {
            ...assignment
        };
    };




    const [formData, setFormData] = useState(
        assignment ? normalizeAssignment(assignmentData) : null
    );
    // console.log(formData)

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };



    const originalData = assignmentData;

    const getUpdatedPayload = (original, updated) => {
        const payload = {};

        Object.keys(updated || {}).forEach((key) => {
            if (updated[key] !== original?.[key]) {
                payload[key] = updated[key];
            }
        });

        return payload;
    };

    const getCustomErrorMessage = (status) => {
        const map = {
            400: "Invalid assignment data. Please check your inputs.",
            401: "Session expired. Please login again.",
            403: "You don’t have permission to update this assignment.",
            404: "Assignment not found. It may have been removed.",
            409: "Conflict detected. Please use diffrent title and try again.",
            422: "Validation failed. Please review the fields.",
            500: "Server error. Please try again later."
        };

        return map[status] || "Something went wrong while updating the assignment.";
    };



    const handleSubmitAssignment = async () => {
        const payload = getUpdatedPayload(originalData, formData);

        if (Object.keys(payload).length === 0) {
            addToast("No changes detected", "warning");
            return;
        }

        console.log(payload);

        // try {
        //     await updateAssignment(assignmentId, payload);

        //     addToast("Assignment updated successfully", "success");

        // } catch (error) {
        //     const status = error?.response?.status;

        //     const message = getCustomErrorMessage(status);

        //     addToast(
        //         `${message}`,
        //         "error"
        //     );
        // }

    }


    if (!assignment) return <p>Assignment not found</p>;



    return (
        <div>
            <AssignmentFormSection
                mode="edit"
                formData={formData}
                handleChange={handleChange}
                attachment={attachment}
                handleSubmit={handleSubmitAssignment}
                loading={isUpdating}
            />
        </div>
    )
}

export default EditAssignment
