import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Input, FileDropZone, Button, TextEditor } from '@/components/ui'


function CreateLesson() {
    const { courseSlug } = useParams();
    const [files, setFiles] = useState([]);

    const [formData, setFormData] = useState({
        course_id: Number(courseSlug),
        title: "",
        overview: ""
        
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    return (
        <main className="flex-1 min-h-0 overflow-y-auto py-4 px-6">
            <h2 className="text-2xl font-semibold flex items-center gap-3">New Lesson</h2>
            <Input
                label="Title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
            />
            <div className="space-y-2">
                <TextEditor
                    label="Overview"
                    value={formData.description}
                    onChange={(value) => handleChange("overview", value)}
                />
            </div>
            <div className="h-80 w-full mt-4" >
                <FileDropZone label="Attachments" multipleFiles={true} heightClass="h-74" files={files} onFilesChange={setFiles} />
            </div>

        </ main>
    )
}

export default CreateLesson
