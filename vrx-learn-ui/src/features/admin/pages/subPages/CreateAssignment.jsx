import React, { useState, useEffect } from 'react'
import { Input, Button, TextEditor, FileDropZone } from '@/components/ui'
import { useParams } from 'react-router-dom';
import useCreateAssignment from '../../hooks/useCreateAssignment';

function CreateAssignment() {
    const { courseSlug } = useParams();
    const [files, setFiles] = useState([]);
    const { createAssignment, loading } = useCreateAssignment();


    const [formData, setFormData] = useState({
        course_id: Number(courseSlug),
        title: "",
        description: "",
        due_date: "",
        due_time: "",
        marks: 0,
        attachments: []
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAssignment(formData);
            alert("Module created successfully");
        } catch (err) {
            alert("Something went wrong");
        }
    };

    return (
        <main className="flex-1 min-h-0 overflow-y-auto py-4 px-6">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-semibold flex items-center gap-3">New Assignment</h2>
            </div>
            <div className='space-y-3 mt-10'>
                <Input
                    label="Title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                />
                <TextEditor
                    label="Description"
                    value={formData.description}
                    onChange={(value) => handleChange("description", value)}
                />
                <div className='flex space-x-2'>
                    <Input
                        label="Due Date & Time"
                        type="datetime-local"
                        value={formData.due_date && formData.due_time
                            ? `${formData.due_date}T${formData.due_time}`
                            : ""}
                        onChange={(e) => {
                            const value = e.target.value; // 2026-02-05T23:59
                            const [date, time] = value.split("T");

                            handleChange("due_date", date);
                            handleChange("due_time", time);
                        }}
                    />
                    <Input
                        label="Max Points"
                        type="number"
                        value={formData.marks}
                        onChange={(e) => handleChange("marks", Number(e.target.value))}
                    />
                </div>
                <div className="h-80 w-full mt-4" >
                    <FileDropZone label="Attachments" multipleFiles={true} heightClass="h-74" files={files} onFilesChange={setFiles} />
                </div>

            </div>
            <div className='flex justify-center'>
                <Button buttonName="Save" onClick={handleSubmit} className="mt-5 px-5 py-2 rounded" />
            </div>

        </main>
    )
}

export default CreateAssignment
