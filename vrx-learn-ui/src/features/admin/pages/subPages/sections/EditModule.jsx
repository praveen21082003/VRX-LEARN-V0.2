import React, { useEffect, useState } from 'react'
import ModuleFormSection from '../../../sections/ModuleFormSection'
import { useOutletContext } from 'react-router-dom';




function EditModule() {

  const { moduleId, fetchCourseContent, addToast,modules, fetchModules, updateModule, isUpdating, moduleLoading, moduleError } = useOutletContext();


  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });


  useEffect(() => {
    if (moduleId) {
      fetchModules(moduleId);
    }
  }, [moduleId, fetchModules]);


  useEffect(() => {
    if (modules) {
      setFormData({
        title: modules.title || '',
        description: modules.description || '',
      });
    }
  }, [modules]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      await updateModule(moduleId, {
        title: formData.title,
        description: formData.description
      });
      fetchCourseContent();
      addToast("Module updated successfully!", "success");
      
    } catch (err) {
      // The error is already caught in moduleError via the hook
      addToast("Update failed", "error");
    }
  };


  if (moduleLoading) return <div className="p-6">Loading module data...</div>;
  if (moduleError) return <div className="p-6 text-red-500">Error loading module.</div>;

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
