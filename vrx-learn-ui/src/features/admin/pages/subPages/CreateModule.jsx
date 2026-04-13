import React, { useState, useEffect } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import useCreateModule from '../../hooks/useCreateModule';
import { useToast } from '@/context/ToastProvider';
import ModuleFormSection from '../../sections/ModuleFormSection';


function CreateModule() {
    // const { courseSlug } = useParams();

    const navigate = useNavigate()

    const { createModule, loading, error } = useCreateModule();
    const { fetchCourseContent, setCourseContent, courseSlug } = useOutletContext();
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
            addToast("Description is too short", "warning");
            hasError = true;
        }

        if (hasError) return;

        const payload = {
            courseId: formData.courseId,
            title: formData.title.trim(),
            description: trimmedDesc === "" ? null : trimmedDesc
        };


        try {
            const newModule = await createModule(payload);
            console.log(newModule);

            setCourseContent((prev) => ({
                ...prev,
                modules: [...(prev.modules || []), newModule]
            }));

            addToast("Module created successfully", "success");
            setFormData(prev => ({ ...prev, title: "", description: "" }));
            setWarning(prev => ({ ...prev, title: "", description: "" }));


            navigate(`/course/${courseSlug}/content/modules`)


        } catch (err) {
            const status = err?.response?.status;

            let errorMessage = "Something went wrong. Please try again.";

            if (status === 400) {
                errorMessage = "Invalid input. Please check your data.";
            } else if (status === 401) {
                errorMessage = "Session expired. Please login again.";
            } else if (status === 403) {
                errorMessage = "You are not allowed to perform this action.";
            } else if (status === 404) {
                errorMessage = "Resource not found.";
            } else if (status === 409) {
                errorMessage = "Module already exists.";
            } else if (status === 500) {
                errorMessage = "Server error. Please try again later.";
            } else {
                errorMessage = err?.response?.data?.message || errorMessage;
            }
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
