import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import useCreateModule from '../../hooks/useCreateModule';
import { useToast } from '@/context/ToastProvider';
import ModuleFormSection from '../../sections/ModuleFormSection';


function CreateModule() {
    const { courseSlug } = useParams();
    const { createModule, loading, error } = useCreateModule();
    const { addToast } = useToast();

    const [formData, setFormData] = useState({
        course_id: Number(courseSlug),
        title: "",
        description: ""
    });



    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createModule(formData);
            addToast("Module created successfully", "success");

        } catch (err) {
            addToast("Module created successfully", "success");
        }
    }


    return (
        <>
            <ModuleFormSection
                mode="create"
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </>

    )
}

export default CreateModule
