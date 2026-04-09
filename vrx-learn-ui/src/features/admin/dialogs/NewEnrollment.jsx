import { useState, useEffect, useMemo, useCallback } from "react";
import { useToast } from "@/context/ToastProvider";
import { Input, SearchSelect, Select, Button } from "@/components/ui";
import { useEnrollments } from '../hooks/useEnrollments';

import useDebouncedSearch from "../hooks/useDebouncedSearch";

import { useEnrollmentData } from '../hooks/useEnrollmentData';
import { searchUser, searchCourse } from '@/services/adminSearch.service';


function NewEnrollment({
  isEdit = false,
  userData = {},
  onClose,
  Status = [],
}) {

  const memoizedParams = useMemo(() => ({
    role: ["trainee", "trainer"]
  }), []);


  const handleSearchUser = useCallback(async ({ query, role }) => {
    return await searchUser({
      username_or_email: query,
      role: role
    });
  }, []);

  const handleSearchCourse = useCallback(async ({ query }) => {
    return await searchCourse({ query });
  }, []);


  const {
    search: userSearch,
    setSearch: setUserSearch,
    results: userResult,
    searching: searchingUser
  } = useDebouncedSearch({
    searchFn: handleSearchUser,
    extraParams: memoizedParams
  });

  const {
    search: courseSearch,
    setSearch: setCourseSearch,
    results: courseResults,
    searching: courseLoading
  } = useDebouncedSearch({
    searchFn: handleSearchCourse,
    delay: 500
  });



  const { createEnrollment, updateEnrollment, isCreating, isUpdating } = useEnrollments();
  const { fetchEnrollments } = useEnrollmentData();

  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    userId: "",
    courseId: "",
    status: "in-progress",
    expireAt: "",
  });


  const [warnings, setWarning] = useState({
    userId: "",
    courseId: "",
    expireAt: "",
  })


  useEffect(() => {
    if (isEdit && userData) {
      setFormData({
        status: userData.status || "in-progress",
        expireAt: userData.expireAt
          ? new Date(userData.expireAt).toISOString().slice(0, 16)
          : "",
      });
    }
  }, [isEdit, userData]);


  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };



  const validateEnrollment = () => {
    let errors = {};

    // User
    if (!formData.userId) {
      errors.userId = "User is required";
    }

    // Course
    if (!formData.courseId) {
      errors.courseId = "Course is required";
    }

    // Expiry Date

    const isValidDateTime = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

    if (formData.expireAt) {
      if (!isValidDateTime.test(formData.expireAt)) {
        errors.expireAt = "Please enter a valid date and time";
      } else {
        const date = new Date(formData.expireAt);
        if (date < new Date()) {
          errors.expireAt = "Expiry date must be in the future";
        }
      }
    }

    setWarning(errors);

    return Object.keys(errors).length === 0;
  };


  const getErrorMessage = (status, type = "create") => {
    if (status === 400) return "Invalid input. Please check the details.";
    if (status === 401) return "Session expired. Please login again.";
    if (status === 403) return "You are not authorized to perform this action.";
    if (status === 404) return "Requested resource not found.";
    if (status === 409) return "User is already enrolled in this course.";
    if (status === 422) return "Please provide valid enrollment data.";
    if (status >= 500) return "Server error. Please try again later.";

    return type === "update"
      ? "Failed to update enrollment. Please try again."
      : "Failed to create enrollment. Please try again.";
  };




  const handleSubmit = async () => {

    if (!isEdit) {
      const isValid = validateEnrollment();
      if (!isValid) return;
    }

    try {

      if (isEdit) {
        const payload = {
          ...(formData.status && { status: formData.status }),
          ...(formData.expireAt && {
            expireAt: new Date(formData.expireAt).toISOString()
          })
        };

        await updateEnrollment(userData.id, payload);

        addToast("Enrollment updated successfully.", "success");

      } else {
        const payload = {
          userId: formData.userId,
          courseId: formData.courseId,
          status: formData.status,
          ...(formData.expireAt && {
            expireAt: new Date(formData.expireAt).toISOString()
          })
        };

        await createEnrollment(payload);

        addToast("Enrollment created successfully.", "success");
      }

      fetchEnrollments();
      onClose?.();

    } catch (err) {
      const status = err?.response?.status;
      addToast(getErrorMessage(status, isEdit ? "update" : "create"), "error");
    }
  }


  return (
    <div className="space-y-8 py-3">

      {!isEdit && (
        <>
          <SearchSelect
            label="User"
            value={userSearch}
            onChange={setUserSearch}
            results={userResult}
            loading={searchingUser}
            getLabel={(item) => item.username}
            getSubLabel={(item) => item.email}
            onSelect={(item) => {
              handleChange("userId", item.id);
              setUserSearch(item.username);
            }}
            inputWarning={warnings.userId}
          />

          <SearchSelect
            label="Course"
            value={courseSearch}
            onChange={setCourseSearch}
            loading={courseLoading}
            results={courseResults}
            renderItem={(item) => item.title}
            onSelect={(item) => {
              handleChange("courseId", item.id);
              setCourseSearch(item.title);
            }}
            inputWarning={warnings.courseId}
          />
        </>
      )}
      {isEdit && (
        <Select
          inputLabel="Status"
          options={[
            { label: "In Progress", value: "in-progress" },
            { label: "Completed", value: "completed" }
          ]}
          value={formData.status}
          onChange={(value) => handleChange("status", value)}
        />
      )}


      <div className="flex flex-col gap-2">
        <label className="text-h5 text-main">Expiry Date</label>
        <Input
          name="expireAt"
          type="datetime-local"
          value={formData.expireAt}
          onChange={(e) => handleChange("expireAt", e.target.value)}
          min={new Date().toISOString().slice(0, 16)}
          className="w-full border-default"
          inputWarning={warnings.expireAt}
        />
      </div>



      <div className="flex w-full gap-3 pt-4">
        <Button
          buttonName="Cancel"
          className="px-4 py-2 rounded-lg w-full border border-default"
          bgClass="bg-transparent"
          textClass="text-main"
          onClick={onClose}
        />

        <Button
          disabled={isCreating || isUpdating}
          buttonName={isCreating ? "Processing..." : isEdit ? isUpdating ? "Updating..." : "Save Changes" : "Add Enrollment"}
          className="px-4 py-2 rounded-lg w-full"
          bgClass="bg-primary"
          textClass="text-white"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default NewEnrollment;