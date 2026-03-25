import React, { useState } from 'react'
import ModuleFormSection from '../../../sections/ModuleFormSection'
import { useOutletContext } from 'react-router-dom';


function EditModule() {

  const { modules, moduleloading, moduleError, courseContent, courseSlug } = useOutletContext();
  console.log(modules);
  const[formData, setFormData] = useState(modules);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <ModuleFormSection
        mode="edit"
        formData={formData}
        handleChange={handleChange}
        // handleSubmit={handleSubmit}
      />
    </>
  )
}

export default EditModule
