import React, { useEffect } from 'react'
import LessonFormSection from '../../../sections/LessonFormSection'
import { useState } from 'react'
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import useLesson from '../../../../courses/hooks/useLesson';
import useUpdateLesson from '../../../hooks/useUpdateLesson';

function EditLesson() {
    const { moduleId, lessonId } = useParams();
    const { addToast } = useOutletContext();
    const { updateLesson, loading: isUpdating } = useUpdateLesson();

    console.log("lessonId:", lessonId);


    const { modules } = useOutletContext();

    const { lesson, loading } = useLesson(lessonId);

    const [files, setFiles] = useState([])

    const currentModule = modules?.find(
        (m) => String(m.id) === String(moduleId)
    );

    console.log(lesson);


    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });


    const [warning, setWarning] = useState({
    });


    useEffect(() => {
        if (lesson) {
            setFormData({
                title: lesson.title || '',
                description: lesson.description || '',
            });
        }
    }, [lesson]);


    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    const handleUpdate = async () => {
        const payload = {};

        if (formData.title.trim() !== (lesson?.title || "")) {
            payload.title = formData.title.trim();
        }

        if (formData.description.trim() !== (lesson?.description || "")) {
            payload.description = formData.description.trim();
        }


        if (Object.keys(payload).length === 0) {
            addToast("No changes to update", "warning");
            return;
        }

        console.log(payload)

        try {
            await updateLesson(lessonId, payload);
            addToast("Lesson updated successfully.", "success");
        } catch (err) {
            const status = err?.response?.status;

            let message = "Failed to update lesson.";

            if (status === 400) message = "Invalid input.";
            else if (status === 401) message = "Session expired. Please login again.";
            else if (status === 403) message = "You are not allowed to update this lesson.";
            else if (status === 404) message = "Lesson not found.";
            else if (status === 409) message = "Conflict occurred.";
            else if (status >= 500) message = "Server error. Try again later.";

            addToast(message, "error");
        }
    };

    if (loading || !lesson) {
        return <div className="p-6">Loading lesson...</div>;
    }

    return (
        <div>
            <LessonFormSection
                mode="edit"
                formData={formData}
                files={files}
                setFiles={setFiles}
                handleChange={handleChange}
                currentModule={currentModule}
                warning={warning}
                handleUpdate={handleUpdate}
                isUpdating={isUpdating}
            />
        </div>
    )
}

export default EditLesson
