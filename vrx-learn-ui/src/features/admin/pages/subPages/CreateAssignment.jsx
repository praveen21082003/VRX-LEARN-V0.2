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
        instructions: "",
        due_date: "",
        due_time: "",
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
            alert("Module created successfully");
        } catch (err) {
            alert("Something went wrong");
        }
    };

    return (
        <>
            <h2 className="text-2xl font-semibold flex items-center">New Assignment</h2>
            <div className='space-y-3'>
                <Input
                    label="Title"
                    placeholder="Assignment name"
                    value={formData.title}
                    inputWarning={formDataErrors.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                />
                <TextEditor
                    label="Instructions"
                    value={formData.description}
                    onChange={(value) => handleChange("instructions", value)}
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
                        min='0'
                        value={formData.marks}
                        inputWarning={formDataErrors.marks}
                        onChange={(e) => handleChange("marks", Number(e.target.value))}
                    />
                    <Input
                        label="Max Attempts"
                        type="number"
                        min="1"
                        max="3"
                        inputWarning={formDataErrors.max_attempts}
                        value={formData.max_attempts}
                        onChange={(e) => handleChange("max_attempts", Number(e.target.value))}
                    />
                </div>
                <div className="h-80 w-full mt-4" >
                    <FileDropZone label="Attachments" multipleFiles={true} heightClass="h-74" files={files} onFilesChange={setFiles} />
                </div>

            </div>
            <div className='flex justify-center'>
                <Button buttonName="Save" onClick={handleSubmit} className="mt-5 px-5 py-2 rounded" />
            </div>

        </>
    )
}

export default CreateAssignment
