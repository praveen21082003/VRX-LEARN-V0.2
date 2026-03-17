import React, { useRef, useState, useEffect } from "react";
import { Icon, Input, CourseTumbnail, Button, TextEditor } from "@/components/ui";
import useUpdateCourseDetails from "../hooks/useUpdateCourseDetails";
import { useParams,useOutletContext } from "react-router-dom";


function CourseInfo() {
  const { courseSlug } = useParams();

  const {courseContent} = useOutletContext();
  
  const { updateCourse, loading } = useUpdateCourseDetails();


  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    author: "",
    shortDescription: "",
    description: "",
    thumbnail: "",
  });

  useEffect(() => {
    setFormData({
      name: courseContent?.name || "",
      author: courseContent?.author || "",
      shortDescription: courseContent?.short_description || "",
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

    <>
      <h2 className="text-h3">
        {/* <Icon name="hugeicons:ai-editing" height="28px" width="28px" /> */}
        Edit Course Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">


        <div className="flex flex-col-reverse md:flex-row gap-4 md:h-49">


          <div className="flex flex-col gap-8 md:w-[65%] xl:w-[70%] justify-end">
            <Input
              label="Title"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              bgClass="bg-input-bg"
            />
            <Input
              label="Author"
              value={formData.author}
              onChange={(e) => handleChange("author", e.target.value)}
              bgClass="bg-input-bg"
            />
          </div>


          <div className="relative noise-overlay flex flex-col md:w-[35%]  xl:w-[30%]">
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
              buttonName="Upload"
              frontIconName="material-symbols:upload"
              frontIconHeight="28px"
              frontIconWidth="28px"
              className="w-full p-1 rounded-b"
              textClass="text-h5"
              bgClass="bg-primary/16 dark:bg-surface-primary-dark"
              onClick={() => fileInputRef.current.click()}
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
            value={formData.description}
            onChange={(value) =>
              handleChange("description", value)
            }
          />

        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            buttonName={loading ? "Saving..." : "Save Changes"}
            className="p-3 rounded"
            disabled={loading}
          />
        </div>

      </form>
    </>
  )
}

export default CourseInfo
