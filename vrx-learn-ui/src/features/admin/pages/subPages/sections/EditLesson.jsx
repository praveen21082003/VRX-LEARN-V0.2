import React from 'react'
import LessonFormSection from '../../../sections/LessonFormSection'
import { useState } from 'react'
import { useParams, useOutletContext } from 'react-router-dom';

function EditLesson() {
    const { modules } = useOutletContext();
    const { moduleId } = useParams();

    const currentModule = modules?.find(
        (m) => String(m.id) === String(moduleId)
    );
    
    const [formData, setFormData] = useState([])
    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div>
            <LessonFormSection
                mode="edit"
                formData={formData}
                // files={files}
                // setFiles={setFiles}
                handleChange={handleChange}
                currentModule={currentModule}
            />
        </div>
    )
}

export default EditLesson
