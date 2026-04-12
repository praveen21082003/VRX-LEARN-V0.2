import React, { useRef, useState, useEffect } from "react";
import { Icon, Input, CourseTumbnail, Button, TextEditor } from "@/components/ui";
import useUpdateCourseDetails from "../hooks/useUpdateCourseDetails";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";


function CourseInfo() {
  const { courseSlug } = useParams();
  const navigate = useNavigate();

  const { courseContent, loading, addToast } = useOutletContext();

  const { updateCourse, isUpdating } = useUpdateCourseDetails();


  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    trainerName: "",
    shortDescription: "",
    longDescription: "",
    thumbnail: null
  });

  useEffect(() => {
    setFormData({
      title: courseContent?.course?.title || "",
      trainerName: courseContent?.course?.trainerName || "",
      shortDescription: courseContent?.course?.shortDescription || "",
      longDescription: courseContent?.course?.longDescription || "",
      thumbnail: courseContent?.course?.thumbnail || null,
    });
  }, [courseContent]);


  // Handle text input
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle thumbnail upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      thumbnail: imageURL,
    }));
  };


  const getCustomErrorMessage = (status) => {
    const map = {
      400: "Invalid course data. Please check inputs.",
      401: "Session expired. Please login again.",
      403: "You don’t have permission to update this course.",
      404: "Course not found.",
      409: "Conflict detected. Try refreshing.",
      500: "Server error. Please try again later."
    };

    return map[status] || "Something went wrong while updating course.";
  };


  const buildUpdatePayload = () => {
    const original = {
      title: courseContent?.course?.title || "",
      shortDescription: courseContent?.course?.shortDescription || "",
      longDescription: courseContent?.course?.longDescription || "",
      thumbnail: courseContent?.course?.thumbnail || null,
    };

    const payload = {};

    const editableFields = [
      "title",
      "shortDescription",
      "longDescription",
      "thumbnail"
    ];

    editableFields.forEach((key) => {
      if (formData[key] !== original[key]) {
        payload[key] = formData[key];
      }
    });

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = buildUpdatePayload();

    if (Object.keys(payload).length === 0) {
      addToast("No changes detected", "warning");
      return;
    }

    try {

      console.log(payload);

      await updateCourse(courseSlug, payload);
      addToast("Course updated successfully", "success");
      navigate(`/course/${courseSlug}/overview`);

    } catch (err) {
      console.log(err)
      const status = err?.response?.status;
      const message = getCustomErrorMessage(status);

      addToast(
        `${message} ${status ? `(Code: ${status})` : ""}`,
        "error"
      );
    }
  };





  return (

    <>
      <h2 className="text-h3">
        {/* <Icon name="hugeicons:ai-editing" height="28px" width="28px" /> */}
        Edit Course Information
      </h2>

      <form onSubmit={handleSubmit} className={`space-y-8 ${loading && 'cursor-progress'}`}>


        <div className="flex flex-col-reverse md:flex-row gap-4 md:h-49">


          <div className="flex flex-col gap-8 md:w-[65%] xl:w-[70%] justify-end">
            <Input
              label="Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              bgClass="bg-input-bg"
            />
            <Input
              label="Author"
              value={formData.trainerName}
              disabled
              title="Cant edit author"
              bgClass="bg-input-bg"
            />
          </div>


          <div className="relative noise-overlay flex flex-col md:w-[35%]  xl:w-[30%]">
            <CourseTumbnail
              name={formData.title}
              image={formData.thumbnail}
              classRounded="rounded-t-sm"
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled
            />

            <Button
              type="button"
              buttonName="Upload"
              frontIconName="material-symbols:upload"
              frontIconHeight="28px"
              frontIconWidth="28px"
              className="w-full p-1 rounded-b"
              textClass="text-h5"
              bgClass="bg-primary/16 dark:bg-surface-primary-dark"
              onClick={() => fileInputRef.current.click()}
              title="You can't upload tumbnail"
            />
          </div>
        </div>


        <div className="space-y-2">
          <label className="text-h5">Short description</label>
          <textarea
            rows="6"
            value={formData.shortDescription}
            onChange={(e) =>
              handleChange("shortDescription", e.target.value)
            }
            className="w-full border text-body bg-input-bg border-input-border rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="text-h5">Description</label>
          <TextEditor
            value={formData.longDescription}
            onChange={(value) =>
              handleChange("longDescription", value)
            }
          />

        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            buttonName={isUpdating ? "Saving..." : "Save Changes"}
            className="p-3 rounded"
            disabled={isUpdating}
          />
        </div>

      </form>
    </>
  )
}

export default CourseInfo
