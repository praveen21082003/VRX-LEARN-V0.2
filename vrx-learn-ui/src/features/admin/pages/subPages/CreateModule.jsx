import React, { useState } from 'react'
import { useParams, useOutletContext } from 'react-router-dom';
import { Input, Button, TextEditor } from '@/components/ui'
import useCreateModule from '../../hooks/useCreateModule';
import { useToast } from '@/context/ToastProvider';
import BackButton from '@/components/navigation/BackButton';


function CreateModule() {
    const { courseSlug } = useParams();
    const { createModule, loading, error } = useCreateModule();
    const { addToast } = useToast();
    const { courseContent } = useOutletContext();

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
            <BackButton to={`/admin/courses/${courseSlug}/edit`} label={`Course - ${courseContent?.name || "Loading..."}`} />
            <h2 className="py-2 text-h3 flex items-center gap-3">New Module</h2>

            <div className='space-y-4'>
                <Input
                    label="Title"
                    placeholder="Module name"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                />

                <div className="space-y-2">
                    <TextEditor
                        label="Description"
                        value={formData.description}
                        onChange={(value) => handleChange("description", value)}
                    />
                </div>
                <div className='flex justify-center'>
                    <Button buttonName="Save" onClick={handleSubmit} className="mt-5 px-5 py-2 rounded" />
                </div>
            </div>
        </>
    )
}

export default CreateModule
