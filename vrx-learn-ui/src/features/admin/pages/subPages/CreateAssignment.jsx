import React, { useState, useEffect } from 'react';
import AssignmentFormSection from '../../sections/AssignmentFormSection';
import { useNavigate, useOutletContext } from 'react-router-dom';
import useAssignment from '../../hooks/useAssignment';
import { useToast } from '@/context/ToastProvider';

function CreateAssignment() {

    console.log("create assignment");
    const { addToast } = useToast();
    const navigate = useNavigate();

    const { setCourseContent, courseSlug } = useOutletContext();

    const [files, setFiles] = useState([]);
    const { createAssignment, isCreating, uploadProgress, error } = useAssignment();

    const [formData, setFormData] = useState({
        courseId: courseSlug,
        title: "",
        instructions: "",
        dueDate: null,
        maxScore: 0,
        numberOfAttempts: 1,
    });


    const [formDataErrors, setFormDataErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (formDataErrors[field]) {
            setFormDataErrors((prev) => ({
                ...prev,
                [field]: ""
            }));
        }
    };


    const validate = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }

        const instructions = formData.instructions?.trim();
        const file = files?.[0];

        if (!instructions && !file) {
            newErrors.instructions = "Enter instructions or upload a file";
            newErrors.file = "Upload a file or enter instructions";
        }

        if (!formData.maxScore || formData.maxScore < 5 || formData.maxScore > 100) {
            newErrors.maxScore = "Max score must be between 5 and 100";
        }

        if (formData.numberOfAttempts < 1 || formData.numberOfAttempts > 3) {
            newErrors.numberOfAttempts = "Attempts must be between 1 and 3";
        }

        if (formData.numberOfAttempts > 3) {
            newErrors.numberOfAttempts = "You cannot set more than 3 attempts";
        } else if (formData.numberOfAttempts <= 0) {
            newErrors.numberOfAttempts = "Max attempts must be at least 1";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const file = files?.[0];
        console.log(file);

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setFormDataErrors(validationErrors);
            return;
        }


        const payload = {
            assignment: { ...formData },
            fileMetadata: files.length > 0 ? {
                filename: files[0].name,
                content_type: files[0].type,
                size: files[0].size
            } : null
        };
        console.log(payload);


        try {
            console.log(payload);
            const newAssignment = await createAssignment(payload, file);
            console.log(newAssignment);

            setCourseContent(prev => ({
                ...prev,
                assignments: [newAssignment, ...(prev.assignments || [])]
            }));
            addToast("Assignment created successfully", "success");
            navigate(`/course/${courseSlug}/content/assignments`)

        } catch (err) {
            addToast("Something went wrong", "error");
            console.warn(err);
        }
    };

    return (
        <AssignmentFormSection
            mode="create"
            formData={formData}
            formDataErrors={formDataErrors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            files={files}
            setFiles={setFiles}
            loading={isCreating}
        />
    );
}

export default CreateAssignment;