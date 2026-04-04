import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useCreateModule from '../../hooks/useCreateModule';
import { useToast } from '@/context/ToastProvider';
import ModuleFormSection from '../../sections/ModuleFormSection';


function CreateModule() {
    const { courseSlug } = useParams();

    const { createModule, loading, error } = useCreateModule();
    const { addToast } = useToast();

    const [warning, setWarning] = useState({
        title: "",
        description: ""
    });

    const [formData, setFormData] = useState({
        courseId: "",
        title: "",
        description: ""
    });

    useEffect(() => {
        if (courseSlug) {
            setFormData(prev => ({
                ...prev,
                courseId: courseSlug
            }));
        }
    }, [courseSlug]);


    console.log(formData);



    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setWarning({ title: "", description: "" });

        let hasError = false;

        if (!formData.title.trim()) {
            setWarning((prev) => ({ ...prev, title: "Title is required" }));
            hasError = true;
        }

        const trimmedDesc = formData.description.trim();
        if (trimmedDesc.length > 0 && trimmedDesc.length < 20) {
            setWarning((prev) => ({ ...prev, description: "Description must be at least 20 characters long" }));
            addToast("Description is too short", "error");
            hasError = true;
        }

        if (hasError) return;

        const payload = {
            courseId: formData.courseId,
            title: formData.title.trim(),
            description: trimmedDesc === "" ? null : trimmedDesc
        };


        try {
            await createModule(payload);
            addToast("Module created successfully", "success");
            setFormData(prev => ({ ...prev, title: "", description: "" }));
            setWarning(prev => ({ ...prev, title: "", description: "" }));

        } catch (err) {
            const errorMessage = err?.response?.data?.message || "Something went wrong. Please try again.";
            addToast(errorMessage, "error");
        }
    }


    return (
        <>
            <ModuleFormSection
                warning={warning}
                loading={loading}
                mode="create"
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </>

    )
}

export default CreateModule
