import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import LessonFormSection from '../../sections/LessonFormSection';
import { useLessons } from '../../hooks/useLessons';

function CreateLesson() {
    const { courseSlug, moduleId } = useParams();
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [warning, setWarning] = useState({
        title: "",
        description: "",
        file: ""
    });

    const { modules, addToast, courseContent } = useOutletContext();


    const { lessons, setLessons, isCreating, uploadProgress, loadedData, mediaStatus, lessonsError, createLesson } = useLessons();

            console.log(lessons)



    const currentModule = courseContent.modules?.find(
        (m) => String(m.id) === String(moduleId)
    );


    const [formData, setFormData] = useState({
        title: "",
        description: "",
        filename: "",
        contentType: "",
        fileSize: 1,
    });



    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    const validatePayload = (formData, file) => {

        const errors = {
            title: "",
            description: "",
            file: ""
        };

        if (!formData.title || formData.title.trim() === "") {
            errors.title = "Title is required";
        }

        if (formData.description && formData.description.trim() !== "") {
            const len = formData.description.trim().length;

            if (len < 5 || len > 5000) {
                errors.description = "Description must be between 5 and 5000 characters";
            }
        }

        if (!file) {
            errors.file = "Please Upload the file";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        const file = files?.[0];

        const errors = validatePayload(formData, file);

        setWarning(errors);

        const hasError = Object.values(errors).some(val => val !== "");

        if (hasError) return;


        const payload = {
            title: formData.title.trim(),
            description: formData.description.trim() || null,
            moduleId: moduleId,
            ...(file && {
                filename: file.name,
                contentType: file.type || 'application/octet-stream',
                fileSize: file.size,
            }),
        };




        try {
            const newLesson = await createLesson(payload, file);
            setLessons(prev => [newLesson, ...(prev || [])]);
            addToast("Lesson created successfully", "success");
            navigate(`/course/${courseSlug}/content/modules/${moduleId}`);
        } catch (err) {
            const status = err?.response?.status;

            let message = "Something went wrong. Please try again.";

            if (status === 400) {
                message = "Invalid input. Please check the details.";
            } else if (status === 401) {
                message = "Session expired. Please login again.";
            } else if (status === 403) {
                message = "You are not authorized to perform this action.";
            } else if (status === 404) {
                message = "Resource not found.";
            } else if (status === 409) {
                message = "A lesson with this title already exists. Please use a different name.";
            } else if (status === 422) {
                message = "Validation failed. Please check required fields.";
            } else if (status >= 500) {
                message = "Server error. Please try again later.";
            }

            addToast(message, "error");
        }
    };



    return (
        <LessonFormSection
            mode="create"
            formData={formData}
            files={files}
            setFiles={setFiles}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isCreating={isCreating}
            currentModule={currentModule}
            uploadProgress={uploadProgress}
            mediaStatus={mediaStatus}
            loadedData={loadedData}
            warning={warning}
        />
    )
}

export default CreateLesson;