import { useState, useEffect } from "react";
import { useToast } from "@/context/ToastProvider";
import { Input, SearchSelect, Select, Button } from "@/components/ui";
import { useEnrollments } from '../hooks/useEnrollments';
import useSearch from '../hooks/useSearch'
import { useEnrollmentData } from '../hooks/useEnrollmentData';


function NewEnrollment({
  isEdit = false,
  userData = {},
  onClose,
  Status = [],
}) {

  const [userSearch, setUserSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [trainer, setTrainer] = useState("trainer");
  const [trainee, setTrainee] = useState("trainee");

  const { results, searchLoading, courseResult, handleSearch } = useSearch();
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
    const delay = setTimeout(() => {
      const roles = [trainer, trainee].filter(Boolean);

      const params = {
        username_or_email: userSearch,
        ...(roles.length > 0 && { role: roles }),
      };

      handleSearch("users", params);
    }, 500);

    return () => clearTimeout(delay);
  }, [userSearch, trainer, trainee]);



  useEffect(() => {
    const delay = setTimeout(() => {
      handleSearch("courses", courseSearch);
    }, 500);

    return () => clearTimeout(delay);
  }, [courseSearch]);


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

        addToast("Enrollment updated!", "success");
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

        addToast("Enrollment created!", "success");
      }

      fetchEnrollments();
      onClose?.();

    } catch (err) {
      let msg = isEdit
        ? "Failed to update enrollment"
        : "Failed to create enrollment";

      if (err.response?.status === 409) {
        msg = "User is already enrolled in this course";
      } else {
        msg = err.response?.data?.message || msg;
      }

      addToast(msg, "error");
    }
  };


  return (
    <div className="space-y-8 py-3">

      {!isEdit && (
        <>
          <SearchSelect
            label="User"
            value={userSearch}
            onChange={setUserSearch}
            results={results}
            loading={searchLoading}
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
            loading={searchLoading}
            results={courseResult}
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