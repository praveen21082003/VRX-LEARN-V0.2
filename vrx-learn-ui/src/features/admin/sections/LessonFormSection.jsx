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
    currentModule,
    handleSubmit,
    isCreating,
    uploadProgress,
    mediaStatus,
    loadedData,
    warning
}) {

    const isEdit = mode === "edit";

    const { courseContent, courseSlug, moduleId } = useOutletContext();


    const moduleTitle = courseContent?.modules?.find(
        m => String(m.id) === String(moduleId)
    )?.title || "Loading...";

    const isLoading = isEdit ? isUpdating : isCreating;


    const renderFileContent = () => {
        if (!isEdit) {
            return (
                <UploadSection
                    files={files}
                    setFiles={setFiles}
                    uploadProgress={uploadProgress}
                    isUploading={isCreating}
                    isUploaded={uploadProgress === 100}
                    mediaStatus={mediaStatus}
                    loadedData={loadedData}
                    inputWarning={warning.file}
                />
            )
        }
        return (
            <div className="text-sm text-gray-500">
                lesson content (pdf or document)
            </div>
        )
    }


    const getButtonText = () => {
        if (isCreating && uploadProgress === 0) {
            return "Preparing for Upload...";
        }

        if (isCreating && uploadProgress > 0 && uploadProgress < 100) {
            return `Uploading... ${uploadProgress}%`;
        }


        if (mediaStatus === "uploaded") {
            return "Done";
        }

        if (isEdit) return "Save Changes";

        return files.length > 0 ? "Upload & Create" : "Create Lesson";
    };


    return (
        <>
            <BackButton to={`/course/${courseSlug}/content/modules/${moduleId}`} label={`Module - ${moduleTitle}`} />
            <h2 className="text-h3">
                {isEdit ? "Edit Lesson" : "New Lesson"}
            </h2>
            <div className='space-y-4'>
                <Input
                    label="Title"
                    placeholder="Lesson name"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    inputWarning={warning.title}
                />
                <div className="space-y-2">
                    <TextEditor
                        label="Overview"
                        value={formData.description}
                        onChange={(value) => handleChange("description", value)}
                        inputWarning={warning.description}
                    />
                </div>


                {renderFileContent()}

                <div className='flex justify-center'>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        buttonName={getButtonText()}
                        className="mt-5 px-5 py-2 rounded" />
                </div>
            </div>

        </>
    )
}

export default LessonFormSection
