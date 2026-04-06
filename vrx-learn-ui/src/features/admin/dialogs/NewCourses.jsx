import React, { useState, useRef, useEffect } from "react";
import { Input, Button, Icon, TextEditor, SearchSelect, InputWarnMessage } from "@/components/ui";
// import { useClickOutside } from "@/hooks/useClickOutside";
import useSearch from '../hooks/useSearch'
import useCourses from "../hooks/useCourses";
import { useToast } from '@/context/ToastProvider'


function NewCourses({
  isEdit = false,
  courseData = {},
  onClose,
  Status = [],
}) {

  const { results, searchLoading, handleSearch } = useSearch();
  console.log(results)
  const {
    createCourse,
    updateCourse,
    deleteCourseById,

    isCreating,
    createError,

    isUpdating,
    updateError,

    isDeleting,
    deleteError, } = useCourses();
  const { addToast } = useToast();


  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    trainerId: ""
  })

  const [warnings, setWarning] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    trainerId: ""
  })

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [trainer, setTrainer] = useState("trainer");



  useEffect(() => {
    const delay = setTimeout(() => {
      const params = {
        username_or_email: search,
        ...(trainer && { role: trainer })
      };

      handleSearch("users", params);
    }, 500);

    return () => clearTimeout(delay);
  }, [search, trainer]);


  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  useEffect(() => {
    if (isEdit && courseData) {
      setFormData({
        title: courseData.title || "",
        shortDescription: courseData.shortDescription || "",
        longDescription: courseData.longDescription || "",
        trainerId: courseData.trainerId || "",
      });

      setSearch(courseData.trainerName || "");
    } else {

      setFormData({
        title: "",
        shortDescription: "",
        longDescription: "",
        trainerId: "",
      });

      setSearch("");
    }
  }, [isEdit, courseData]);

  // form validation
  const validation = () => {
    let errors = {};

    // Title
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    } else if (formData.title.trim().length < 10) {
      errors.title = "Title must be at least 10 characters";
    }

    // Short Description
    if (formData.shortDescription?.trim()) {
      if (formData.shortDescription.trim().length < 50) {
        errors.shortDescription = "Short description must be at least 50 characters";
      }
    }

    // Long Description
    if (formData.longDescription?.trim()) {
      const len = formData.longDescription.trim().length;

      if (len < 50) {
        errors.longDescription = "Long description must be at least 50 characters";
      } else if (len > 600) {
        errors.longDescription = "Long description must not exceed 600 characters";
      }
    }

    // Trainer
    if (!formData.trainerId) {
      errors.trainerId = "Trainer is required";
    }

    setWarning(errors);

    return Object.keys(errors).length === 0;
  };


  const handleSubmit = async () => {

    if (!isEdit) {
      const isValid = validation();
      if (!isValid) return;
    }

    const payload = {
      title: formData.title,
      shortDescription: formData.shortDescription,
      trainerId: formData.trainerId,
      thumbnail: null,
      details: {
        type: "live",
        totalHours: 1,
        price: 1001,
      },
      ...(formData.longDescription?.trim() && {
        longDescription: formData.longDescription
      }),
    };

    try {
      if (isEdit) {
        await updateCourse(courseData.id, payload);

        addToast("Course updated successfully!", "success");
      } else {
        await createCourse(payload);

        addToast("Course created successfully!", "success");

        setFormData({
          title: "",
          shortDescription: "",
          longDescription: "",
          trainerId: "",
        });

        setSearch("");
      }

      onClose?.();

    } catch (err) {
      const msg = err.response?.data?.message || "Operation failed";
      addToast(msg, "error");
    }
  };

  return (
    <div className="space-y-4">

      <Input
        label="Title"
        placeholder="Enter course title"
        paddingClass="p-2"
        value={formData.title || ""}
        onChange={(e) => handleChange("title", e.target.value)}
        inputWarning={warnings.title}
      />

      <div className="relative">
        <SearchSelect
          label="Trainers"
          value={search}
          onChange={(value) => {
            setSearch(value);
            if (!value) {
              handleChange("trainerId", "");
            }
          }}
          results={results}
          loading={searchLoading}
          getLabel={(item) => item.username}
          getSubLabel={(item) => item.email}
          onSelect={(item) => {
            handleChange("trainerId", item.id);
            setSearch(item.username);
          }}
          inputWarning={warnings.trainerId}
        />
      </div>

      {/* Short Description */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Short Description</label>
        <textarea
          rows={4}
          className="w-full p-3 rounded-md  text-sm leading-relaxed resize-none overflow-hidden border  focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          placeholder="Briefly describe what this course covers (minimum 50 characters if provided)"
          value={formData.shortDescription || ""}
          onChange={(e) => handleChange("shortDescription", e.target.value)}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
        />
        {warnings.shortDescription && <InputWarnMessage message={warnings.shortDescription} />}
      </div>
      {!isOpen &&
        <div className="flex justify-between" onClick={() => setIsOpen((prev) => !prev)}>
          <label className="text-h5">Add Long Description<span className="text-caption">(optional)</span></label>
          <Icon name="iconamoon:arrow-down-2" />
        </div>
      }

      {isOpen &&
        <div>
          <label className="text-h5">Description</label>
          <TextEditor
            value={formData.longDescription}
            onChange={(value) => handleChange("longDescription", value)}
            inputWarning={warnings.longDescription}
            placeholder="Provide a detailed description of the course, including key topics and outcomes"
          />
        </div>
      }


      {/* Actions */}
      <div className="flex w-full gap-3">
        <Button
          buttonName="Cancel"
          className="px-4 py-2 rounded-lg w-full"
          bgClass=""
          textClass=""
        />
        <Button
          buttonName={isEdit ? isUpdating ? "Updating..." : "Save Changes" : isCreating ? "Creating..." : "Add Course"}
          className="px-4 py-2 rounded-lg w-full"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default NewCourses;

