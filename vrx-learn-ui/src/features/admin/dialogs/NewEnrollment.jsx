import { useState, useEffect } from "react";
import { useToast } from "@/context/ToastProvider";
import { Input, Select, SearchDropdown, Button } from "@/components/ui";
import { useCreateEnrollments } from "../hooks/useCreateEnrollments";
import { useSearchUsers } from "../hooks/useSearchUsers";
import { useSearchCourses } from "../hooks/useSearchCourse";

function NewEnrollment({
  isEdit = false,
  userData = {},
  onClose,
  Status = [],
}) {

  const [userSearch, setUserSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");

  const [userResults, setUserResults] = useState([]);
  const [courseResults, setCourseResults] = useState([]);

  const { createEnrollment, loading } = useCreateEnrollments();
  const { users, fetchUsers, loading: userLoading } = useSearchUsers();
  const { courses, fetchCourses, loading: courseLoading } = useSearchCourses();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    userId: "",
    courseId: "",
    status: "IN_PROGRESS", // Match API Casing (Usually Uppercase)
    expireAt: "",
  });

  useEffect(() => {
    if (isEdit && userData) {
      setFormData({
        userId: userData.userId || userData.user?.id || "",
        courseId: userData.courseId || userData.course?.id || "",
        status: userData.status || "IN_PROGRESS",
        // Format date for datetime-local input (YYYY-MM-DDTHH:mm)
        expireAt: userData.expireAt ? new Date(userData.expireAt).toISOString().slice(0, 16) : "",
      });
    }
  }, [isEdit, userData]);

  // // Search Effects (Keep these as they were)
  // useEffect(() => {
  //   if (userSearch.length < 2) return;
  //   const timer = setTimeout(() => fetchUsers(userSearch), 400);
  //   return () => clearTimeout(timer);
  // }, [userSearch]);

  // useEffect(() => {
  //   if (courseSearch.length < 2) return;
  //   const timer = setTimeout(() => fetchCourses(courseSearch), 400);
  //   return () => clearTimeout(timer);
  // }, [courseSearch]);

  const userOptions = (users || []).map((u) => ({
    label: `${u.name} (${u.email})`,
    value: u.id,
  }));

  const courseOptions = (courses || []).map((course) => ({
    label: course.title,
    value: course.id,
  }));

  const statusOptions = (Status || []).map((s) => ({
    label: s,
    value: s.toUpperCase(),
  }));


  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAction = async () => {
    if (!formData.userId || !formData.courseId || !formData.expireAt) {
      addToast("Please fill all required fields", "warning");
      return;
    }

    try {
      const payload = {
        ...formData,
        // Convert back to ISO for the database
        expireAt: new Date(formData.expireAt).toISOString(),
      };

      if (isEdit) {
        // await updateEnrollment(userData.id, payload);
        addToast("Enrollment updated!", "success");
      } else {
        await createEnrollment(payload);
        addToast("Enrollment created!", "success");
      }

      onClose?.();
    } catch (err) {
      addToast(err.response?.data?.message || "Operation failed", "error");
    }
  };

  return (
    <div className="space-y-4">

      <SearchDropdown
        value={userSearch}
        onChange={setUserSearch}
        results={userResults}
        onSelect={(user) => {
          setFormData((prev) => ({
            ...prev,
            userId: user.id,
          }));
          setUserSearch(user.label); // show selected
        }}
        placeholder="Search user"
      />

      <SearchDropdown
        value={courseSearch}
        onChange={setCourseSearch}
        results={courseResults}
        onSelect={(course) => {
          setFormData((prev) => ({
            ...prev,
            courseId: course.id,
          }));
          setCourseSearch(course.label);
        }}
        placeholder="Search course"
        loading={true}
      />


      <div className="flex flex-col gap-2">
        <label className="text-h5 text-main">Expiry Date</label>
        <Input
          name="expireAt"
          type="datetime-local"
          value={formData.expireAt}
          onChange={(e) => handleSelectChange("expireAt", e.target.value)}
          min={new Date().toISOString().slice(0, 16)}
          className="w-full border-default"
        />
      </div>

      {isEdit && (
        <Select
          inputLabel="Status"
          options={statusOptions}
          value={formData.status}
          onChange={(val) => handleSelectChange("status", val)}
        />
      )}

      <div className="flex w-full gap-3 pt-4">
        <Button
          buttonName="Cancel"
          className="px-4 py-2 rounded-lg w-full border border-default"
          bgClass="bg-transparent"
          textClass="text-main"
          onClick={onClose}
        />

        <Button
          disabled={loading}
          buttonName={loading ? "Processing..." : isEdit ? "Save Changes" : "Add Enrollment"}
          className="px-4 py-2 rounded-lg w-full"
          bgClass="bg-primary"
          textClass="text-white"
          onClick={handleAction}
        />
      </div>
    </div>
  );
}

export default NewEnrollment;