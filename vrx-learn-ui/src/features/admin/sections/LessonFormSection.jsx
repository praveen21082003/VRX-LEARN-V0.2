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
    handleSubmit,
    isCreating,
    uploadProgress,
    mediaStatus,
    loadedData,
    warning,
    isUpdating
}) {

    const isEdit = mode === "edit";

    const { courseContent, courseSlug, addToast, moduleId } = useOutletContext();

    const currentModule = courseContent?.modules?.find(
        (m) => String(m.id) === String(moduleId)
    );

    const isLoading = isEdit ? isUpdating : isCreating;


    const renderFileContent = () => {
        if (mode === "create") {
            return (
                <UploadSection
                    label="Lesson attachment"
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
        // CREATE MODE
        if (!isEdit) {
            if (isCreating && uploadProgress === 0) {
                return "Preparing...";
            }

            if (isCreating && uploadProgress > 0 && uploadProgress < 100) {
                return `Uploading... ${uploadProgress}%`;
            }

            if (mediaStatus === "uploaded") {
                return "Finalizing...";
            }

            return files.length > 0 ? "Upload & Create" : "Create Lesson";
        }

        if (isUpdating) {
            return "Updating...";
        }

        return "Save Changes";
    };


    return (
        <>
            <BackButton to={`/course/${courseSlug}/content/modules/${moduleId}`} label={`Module - ${currentModule.title}`} />
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
