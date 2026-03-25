import React from 'react'
import { useParams, useOutletContext } from 'react-router-dom';
import BackButton from '@/components/navigation/BackButton';
import { Input, TextEditor, UploadSection, Button } from "@/components/ui"



function LessonFormSection({
    mode,
    formData,
    handleChange,
    files,
    setFiles,
    currentModule
}) {

    const isEdit = mode === "edit";

    const { courseSlug, moduleId } = useParams();


    return (
        <>
            <BackButton to={`/course/${courseSlug}/content/modules/${moduleId}`} label={`Module - ${currentModule?.title || "Loading..."}`} />
            <h2 className="text-h3">
                {isEdit ? "Edit Lesson" : "New Lesson"}
            </h2>
            <div className='space-y-4'>
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

                {!isEdit && (
                    <UploadSection
                        files={files}
                        setFiles={setFiles}
                    // onUpload={handleUpload}
                    />
                )}
                {isEdit && (
                    <div className="text-sm text-gray-500">
                        lesson content (pdf or document)
                    </div>
                )}

                <div className='flex justify-center'>
                    <Button
                        buttonName={isEdit ? "save" : files.length <= 0 ? "Submit" : "Upload"}
                        className="mt-5 px-5 py-2 rounded" />
                </div>
            </div>

        </>
    )
}

export default LessonFormSection
