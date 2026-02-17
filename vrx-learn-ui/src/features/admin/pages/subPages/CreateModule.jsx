import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Input, Button, TextEditor } from '@/components/ui'
import useCreateModule from '../../hooks/useCreateModule';

function CreateModule() {
    const { courseSlug } = useParams();
    const { createModule, loading, error } = useCreateModule();

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
            alert("Module created successfully");
        } catch (err) {
            alert("Something went wrong");
        }
    }


    return (
        <main className="flex-1 min-h-0 overflow-y-auto py-4 px-6">
            <h2 className="text-2xl font-semibold flex items-center gap-3">New Module</h2>


            <Input
                label="Title"
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
        </main>
    )
}

export default CreateModule
