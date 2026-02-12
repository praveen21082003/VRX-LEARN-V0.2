import React, { useRef, useState, useEffect } from "react";
import useCourseContent from '@/features/courses/hooks/useCourseContent';
import { Icon, Input, CourseTumbnail, Button } from "@/components/ui";
import useUpdateCourseDetails from "../hooks/useUpdateCourseDetails";
import { useParams } from "react-router-dom";


function CourseInfo() {
  const { courseSlug } = useParams();
  const { courseContent } = useCourseContent(courseSlug);
  const { updateCourse, loading } = useUpdateCourseDetails();

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    author: "",
    description: "",
    thumbnail: "",
  });

  useEffect(() => {
    setFormData({
      name: courseContent?.name || "",
      author: courseContent?.author || "",
      description: courseContent?.description || "",
      thumbnail: courseContent?.thumbnail || "",
    })
  }, [courseContent])


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCourse(courseSlug, formData);
    alert("Course updated successfully");
  };



  return (

    <div className="space-y-6">
      <h2 className="text-2xl font-semibold flex items-center gap-3">
        {/* <Icon name="hugeicons:ai-editing" height="28px" width="28px" /> */}
        Edit Course Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">


        <div className="flex gap-2 h-49">


          <div className="flex flex-col gap-6 w-[70%] justify-end">
            <Input
              label="Title"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              bgClass="bg-active"
            />
            <Input
              label="Author"
              value={formData.author}
              onChange={(e) => handleChange("author", e.target.value)}
              bgClass="bg-active"
            />
          </div>


          <div className="flex flex-col ">
            <CourseTumbnail
              name={formData.name}
              image={formData.thumbnail}
              classRounded="rounded-t-sm"
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <Button
              type="button"
              buttonName="Upload Image"
              frontIconName="material-symbols:upload"
              frontIconHeight="28px"
              frontIconWidth="28px"
              classStyle="w-full p-1 bg-active rounded-b"
              textClass="text-primary font-semibold"
              onClick={() => fileInputRef.current.click()}
            />
          </div>
        </div>


        <div className="space-y-2">
          <label className="text-sm font-bold">Description</label>
          <textarea
            rows="6"
            value={formData.description}
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
            className="w-full border text-sm border-border rounded-lg p-3 focus:outline-none focus:ring-2 bg-active focus:ring-primary"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            buttonName={loading ? "Saving..." : "Save Changes"}
            classStyle="p-3 rounded"
            disabled={loading}
          />
        </div>

      </form>
    </div>
  )
}

export default CourseInfo
