import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Input, Button, Icon, TextEditor, SearchSelect, InputWarnMessage } from "@/components/ui";
// import { useClickOutside } from "@/hooks/useClickOutside";
import useCourses from "../hooks/useCourses";
import { useToast } from '@/context/ToastProvider'

import { searchUser } from '@/services/adminSearch.service'
import useDebouncedSearch from "../hooks/useDebouncedSearch";


function NewCourses({
  isEdit = false,
  courseData = {},
  onClose,
  Status = [],
  setKpis,
  onSuccess,
}) {

  const [isOpen, setIsOpen] = useState(false);


  const handleSearchUser = useCallback(async ({ query, role }) => {
    return await searchUser({
      username_or_email: query,
      role
    });
  }, []);



  const memoizedParams = useMemo(() => ({
    role: "trainer"
  }), []);

  const { search, setSearch, results, searching } = useDebouncedSearch({
    searchFn: handleSearchUser,
    extraParams: memoizedParams
  });



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


  useEffect(() => {
    if (isEdit && courseData && Object.keys(courseData).length > 0) {
      setFormData({
        title: courseData.title || "",
        shortDescription: courseData.shortDescription || "",
        longDescription: courseData.longDescription || "",
        trainerId: courseData.trainerId || courseData.trainerName || ""
      });


      if (courseData.trainerName) {
        setSearch(courseData.trainerName);
      }
    }
  }, [isEdit, courseData, setSearch]);


  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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


  const getErrorMessage = (status) => {
    if (status === 400) return "Invalid input. Please check the details.";
    if (status === 401) return "Session expired. Please login again.";
    if (status === 403) return "You are not authorized to perform this action.";
    if (status === 404) return "Requested resource not found.";
    if (status === 409) return "A course with similar title already exists.";
    if (status === 422) return "Please provide valid information.";
    if (status >= 500) return "Server error. Please try again later.";

    return "Something went wrong. Please try again.";
  };


  const handleSubmit = async () => {

    if (!isEdit) {
      const isValid = validation();
      if (!isValid) return;
    }


    try {
      if (isEdit) {
        const formKeys = ["title", "shortDescription", "longDescription", "trainerId"];


        const updatedPayload = formKeys.reduce((acc, key) => {

          const originalValue = courseData[key] ?? "";
          const newValue = formData[key] ?? "";

          if (newValue !== originalValue) {
            acc[key] = newValue;
          }

          return acc;
        }, {});

        if (Object.keys(updatedPayload).length === 0) {
          addToast("No changes detected.", "warning");
          return;
        }


        await updateCourse(courseData.id, updatedPayload);
        addToast("Course updated successfully!", "success");
        onSuccess?.();

      } else {

        const createPayload = {
          title: formData.title,
          shortDescription: formData.shortDescription || null,
          longDescription: formData.longDescription || null,
          thumbnail: null,
          trainerId: formData.trainerId,

          details: {
            type: "live",
          }
        };

        await createCourse(createPayload);


        addToast("Course created successfully!", "success");

        setFormData({
          title: "",
          shortDescription: "",
          longDescription: "",
          trainerId: "",
        });
        setSearch("");
        onSuccess?.();
      }

      onClose?.();


    } catch (err) {
      const status = err?.response?.status;
      addToast(getErrorMessage(status), "error");
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
          loading={searching}
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

