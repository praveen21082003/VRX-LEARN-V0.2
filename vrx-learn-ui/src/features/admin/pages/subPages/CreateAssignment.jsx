import React, { useState, useEffect } from 'react'
import AssignmentFormSection from '../../sections/AssignmentFormSection';
import { useParams } from 'react-router-dom';
import useCreateAssignment from '../../hooks/useCreateAssignment';
import { useToast } from '@/context/ToastProvider';

function CreateAssignment() {

    const { courseSlug } = useParams();
    const { addToast } = useToast();


    const [files, setFiles] = useState([]);
    const { createAssignment, loading } = useCreateAssignment();


    const [formData, setFormData] = useState({
        course_id: Number(courseSlug),
        title: "",
        instructions: "",
        submission_date:"",
        marks: 0,
        max_attempts: 1,
        attachments: []
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
            }))
        }
    };

    useEffect(() => {
        const formattedFiles = files.map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
        }));

        setFormData((prev) => ({
            ...prev,
            attachments: formattedFiles,
        }));
    }, [files]);


    const validate = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Title is required"
        }
        if (!formData.instructions.trim()) {
            newErrors.instructions = "Instructions is required";
        }
        if (formData.max_attempts > 3) {
            newErrors.max_attempts = "You cannot set more than 3 attempts";
        } else if (formData.max_attempts <= 0) {
            newErrors.max_attempts = "Max attempts must be at least 1";
        }

        return newErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setFormDataErrors(validationErrors);
            return;
        }


        try {
            await createAssignment(formData);
            addToast("Module created successfully", "success");
        } catch (err) {
            addToast("Something went wrong", "error");
        }
    };

    return (
        <>
            <AssignmentFormSection
                mode="create"
                formData={formData}
                formDataErrors={formDataErrors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                files={files}
                setFiles={setFiles}
                loading={loading}
            />

        </>
    )
}

export default CreateAssignment
