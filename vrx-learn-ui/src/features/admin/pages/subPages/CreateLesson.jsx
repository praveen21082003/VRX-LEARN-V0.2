import React, { useState } from 'react'
import { useParams, useOutletContext } from 'react-router-dom';
import { Input, FileDropZone, Button, TextEditor } from '@/components/ui'
import BackButton from '@/components/navigation/BackButton';


function CreateLesson() {
    const { courseSlug, moduleId } = useParams();
    const [files, setFiles] = useState([]);
    const { modules } = useOutletContext();

    const currentModule = modules?.find(
        (m) => String(m.id) === String(moduleId)
    );


    const [formData, setFormData] = useState({
        course_id: Number(courseSlug),
        module_id: Number(moduleId),
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
        <>
            <BackButton to={`/admin/courses/${courseSlug}/edit/modules`} label={`Module - ${currentModule?.title || "Loading..."}`} />

            <h2 className="text-2xl font-semibold mt-2 mb-4">
                New Lesson
            </h2>
            <Input
                label="Title"
                placeholder="Lesson name"
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
            <div className="w-full mt-4" >
                <FileDropZone label="Attachments" multipleFiles={false} heightClass="h-74" files={files} onFilesChange={setFiles} />
            </div>
            <div className='flex justify-center'>
                <Button buttonName={files.length <= 0 ? "Submit" : "Upload"} className="mt-5 px-5 py-2 rounded" />
            </div>

        </>
    )
}

export default CreateLesson
