import React, { useState, useEffect } from 'react';
import AssignmentFormSection from '../../sections/AssignmentFormSection';
import { useParams } from 'react-router-dom';
import useAssignment from '../../hooks/useAssignment';
import { useToast } from '@/context/ToastProvider';

function CreateAssignment() {
    const { courseSlug } = useParams();
    const { addToast } = useToast();

    const [files, setFiles] = useState([]);
    const { createAssignment, isCreating, uploadProgress, error } = useAssignment();

    const [formData, setFormData] = useState({
        courseId: courseSlug,
        title: "",
        instructions: "",
        dueDate: "",
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
        if (!formData.instructions.trim()) {
            newErrors.instructions = "Instructions is required";
        }
        // Fixed: Use numberOfAttempts instead of max_attempts
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
            await createAssignment(payload, file);
            addToast("Assignment created successfully", "success");
        } catch (err) {
            addToast("Something went wrong", "error");
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