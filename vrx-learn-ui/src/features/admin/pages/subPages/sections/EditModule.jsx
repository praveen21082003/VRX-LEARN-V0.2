import React, { useEffect, useState } from 'react'
import ModuleFormSection from '../../../sections/ModuleFormSection'
import { useOutletContext } from 'react-router-dom';




function EditModule() {

  const { moduleId, courseSlug, fetchCourseContent, addToast, updateModule, isUpdating, courseContent } = useOutletContext();


  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const selectedModule = courseContent?.modules?.find(
    (m) => m.id === moduleId
  );



  useEffect(() => {
    if (selectedModule) {
      setFormData({
        title: selectedModule.title || '',
        description: selectedModule.description || '',
      });
    }
  }, [selectedModule]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const payload = {};

    if (formData.title.trim() !== (selectedModule?.title || "")) {
      payload.title = formData.title.trim();
    }

    if (formData.description.trim() !== (selectedModule?.description || "")) {
      payload.description = formData.description.trim();
    }

    if (Object.keys(payload).length === 0) {
      addToast("No changes are Done to update", "warning");
      return;
    }

    try {
      await updateModule(moduleId, payload);
      addToast("Module updated successfully.", "success");

      await fetchCourseContent(courseSlug);
    } catch (err) {
      const status = err?.response?.status;

      let message = "Failed to update module. Please try again.";

      if (status === 400) {
        message = "Invalid input. Please check your changes.";
      } else if (status === 401) {
        message = "Session expired. Please log in again.";
      } else if (status === 403) {
        message = "You do not have permission to update this module.";
      } else if (status === 404) {
        message = "Module not found. It may have been removed.";
      } else if (status === 409) {
        message = "Conflict detected. Module may already exist with this name.";
      } else if (status === 500) {
        message = "Server error. Please try again later.";
      } else {
        message = err?.response?.data?.message || message;
      }

      addToast(message, "error");
    }
  };





  if (!courseContent?.modules) {
    return <div className="p-6">Loading module data...</div>;
  }

  return (
    <>
      <ModuleFormSection
        mode="edit"
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isUpdating={isUpdating}
      />
    </>
  )
}

export default EditModule
