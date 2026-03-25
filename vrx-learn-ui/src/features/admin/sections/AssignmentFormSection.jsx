import { Input, Button, TextEditor, UploadSection, AttachmentCard} from '@/components/ui'
import BackButton from '@/components/navigation/BackButton';
import { useParams, useOutletContext } from 'react-router-dom';


function AssignmentFormSection({
    mode,
    formData,
    formDataErrors,
    handleChange,
    handleSubmit,
    files,
    setFiles,
    loading
}) {

    const { courseSlug } = useParams();
    const { courseContent } = useOutletContext();

    const isEdit = mode === "edit";

    if (!formData) return <p>Loading...</p>;


    return (
        <>
            <BackButton to={`/course/${courseSlug}/content/assignments`} label={`${courseContent?.name || "Loading..."} - Assignments`} />
            <h2 className="text-h3">
                {isEdit ? "Edit Assignment" : "New Assignment"}
            </h2>

            <div className="space-y-4">
                <Input
                    label="Title"
                    value={formData?.title || ""}
                    // inputWarning={formDataErrors.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                />

                <TextEditor
                    label="Instructions"
                    value={formData?.instructions}
                    onChange={(value) => handleChange("instructions", value)}
                />

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
                    <Input
                        label="Due Date & Time"
                        type="datetime-local"
                        min={new Date().toISOString().slice(0, 16)}
                        value={
                            formData?.submission_date
                        }
                        onChange={(e) => {
                            const value = e.target.value;
                            handleChange("submission_date", value);
                        }}
                    />
                    <Input
                        label="Max Points"
                        type="number"
                        min='0'
                        value={formData?.marks}
                        // inputWarning={formDataErrors.marks}
                        onChange={(e) => handleChange("marks", Number(e.target.value))}
                    />
                    <Input
                        label="Max Attempts"
                        type="number"
                        min="1"
                        max="3"
                        // inputWarning={formDataErrors.max_attempts}
                        value={formData?.max_attempts}
                        onChange={(e) => handleChange("max_attempts", Number(e.target.value))}
                    />
                </div>

                {!isEdit && (
                    <UploadSection files={files} setFiles={setFiles} />
                )}

                {isEdit && (
                    <div className="text-sm text-gray-500">
                        <ul className="flex gap-2">
                            {formData?.attachments.map((file, index) => (
                                <li key={index}>
                                    <AttachmentCard file={file} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex justify-center">
                <Button
                    buttonName={isEdit ? "Save Changes" : "Submit"}
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-5 px-5 py-2 rounded"
                />
            </div>
        </>
    );
}

export default AssignmentFormSection;