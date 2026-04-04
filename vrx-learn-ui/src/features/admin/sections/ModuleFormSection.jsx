
import { useOutletContext } from 'react-router-dom';
import { Input, Button, TextEditor } from '@/components/ui'
import BackButton from '@/components/navigation/BackButton';


function ModuleFormSection({
    mode,
    formData,
    loading,
    isUpdating,
    error,
    handleChange,
    handleSubmit,
    warning

}) {

    const isEdit = mode === "edit";

    const { courseContent, courseSlug } = useOutletContext();
    console.log(formData);


    return (
        <>
            <BackButton to={`/course/${courseSlug}/content/modules`} label={`${courseContent?.course.title || "Loading..."} - Modules`} />
            <h2 className="text-h3">
                {isEdit ? "Edit Module" : "New Module"}
            </h2>

            <div className='space-y-4'>
                <Input
                    label="Title"
                    placeholder="Module name"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    inputWarning={warning && warning.title}
                />

                <div className="space-y-2">
                    <TextEditor
                        label="Description"
                        value={formData.description}
                        onChange={(value) => handleChange("description", value)}
                        inputWarning={warning && warning.description}
                    />
                </div>
                <div className='flex justify-center'>
                    <Button
                        disabled={loading}
                        buttonName={!isEdit ? loading ? "Adding..." : "Add Module" : isUpdating ? "Saving..." : "Save Changes"}
                    onClick={handleSubmit}
                    className="mt-5 px-5 py-2 rounded"
                    />
                </div>
            </div>
        </>
    )
}

export default ModuleFormSection
