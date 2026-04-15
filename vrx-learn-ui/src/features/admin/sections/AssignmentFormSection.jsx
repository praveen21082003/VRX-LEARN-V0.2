import { Input, Button, TextEditor, UploadSection, AttachmentCard } from '@/components/ui'
import BackButton from '@/components/navigation/BackButton';
import { useParams, useOutletContext } from 'react-router-dom';
import useMedia from '@/features/courses/hooks/useMedia';
import formatDateTimeLocal from '@/utils/formatDateTimeLocal'


function AssignmentFormSection({
    mode,
    formData,
    formDataErrors,
    handleChange,
    handleSubmit,
    files,
    setFiles,
    loading,
    attachment
}) {

    const { courseSlug } = useParams();
    const { courseContent } = useOutletContext();



    const isEdit = mode === "edit";

    const mediaId = attachment?.mediaId;

    const { url, loading: mediaLoading } = useMedia(mediaId);


    if (!formData) return <p>Loading...</p>;

    return (
        <>
            <BackButton to={`/course/${courseSlug}/content/assignments`} label={`${courseContent?.course?.title || "Loading..."} - Assignments`} />
            <h2 className="text-h3">
                {isEdit ? "Edit Assignment" : "New Assignment"}
            </h2>

            <div className="space-y-4">
                <Input
                    label="Title"
                    value={formData?.title || ""}
                    inputWarning={formDataErrors?.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                />

                <TextEditor
                    label="Instructions"
                    value={formData?.instructions}
                    onChange={(value) => handleChange("instructions", value)}
                    inputWarning={formDataErrors?.instructions}
                />

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
                    <Input
                        label="Due Date & Time"
                        type="datetime-local"
                        min={new Date().toISOString().slice(0, 16)}
                        value={formatDateTimeLocal(formData?.dueDate)}
                        onChange={(e) => {
                            const value = e.target.value;
                            handleChange("dueDate", value);
                        }}
                    />
                    <Input
                        label="Max Points"
                        type="number"
                        min='0'
                        disabled={isEdit}
                        value={formData?.maxScore}
                        inputWarning={formDataErrors?.maxScore}
                        onChange={(e) => handleChange("maxScore", Number(e.target.value))}
                    />
                    <Input
                        label="Max Attempts"
                        type="number"
                        min="1"
                        max="3"
                        disabled={isEdit}
                        inputWarning={formDataErrors.max_attempts}
                        value={formData?.numberOfAttempts}
                        onChange={(e) => handleChange("numberOfAttempts", Number(e.target.value))}
                    />
                </div>
                {isEdit && (
                    <p className="text-caption text-muted">
                        Max score and attempts cannot be changed after creation
                    </p>
                )}

                {!isEdit && (
                    <UploadSection files={files} setFiles={setFiles} label="Attachments" optional={true} inputWarning={formDataErrors?.file} />
                )}

                {isEdit && (
                    <div className="text-sm text-gray-500">
                        {attachment && (
                            <>
                                <h1 className="text-h45 mt-6">Attachments</h1>
                                <p className="text-sm text-gray-500 mt-2">
                                    Existing attachments are read-only and cannot be modified.
                                </p>
                                <div className="flex flex-wrap gap-3 mt-2">
                                    <AttachmentCard
                                        fileName={attachment.filename}
                                        url={url}
                                        loading={mediaLoading}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className="flex justify-center">
                <Button
                    buttonName={
                        loading
                            ? isEdit
                                ? "Updating..."
                                : "Submitting..."
                            : isEdit
                                ? "Save Changes"
                                : "Submit"
                    }
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-5 px-5 py-2 rounded"
                    frontIconName={loading ? "eos-icons:loading" : ""}
                />
            </div>
        </>
    );
}

export default AssignmentFormSection;