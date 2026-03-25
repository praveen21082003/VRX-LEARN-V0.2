
import { useParams, useOutletContext } from 'react-router-dom';
import { Input, Button, TextEditor } from '@/components/ui'
import BackButton from '@/components/navigation/BackButton';


function ModuleFormSection({
    mode,
    formData,
    loading,
    error,
    handleChange,
    handleSubmit

}) {

    const isEdit = mode === "edit";

    const { courseSlug } = useParams();
    const { courseContent } = useOutletContext();


    return (
        <>
            <BackButton to={`/course/${courseSlug}/content/modules`} label={`${courseContent?.name || "Loading..."} - Modules`} />
            <h2 className="text-h3">
                {isEdit ? "Edit Module" : "New Module"}
            </h2>

            <div className='space-y-4'>
                <Input
                    label="Title"
                    placeholder="Module name"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                />

                <div className="space-y-2">
                    <TextEditor
                        label="Description"
                        value={formData.description}
                        onChange={(value) => handleChange("description", value)}
                    />
                </div>
                <div className='flex justify-center'>
                    <Button buttonName="Save" onClick={handleSubmit} className="mt-5 px-5 py-2 rounded" />
                </div>
            </div>
        </>
    )
}

export default ModuleFormSection
