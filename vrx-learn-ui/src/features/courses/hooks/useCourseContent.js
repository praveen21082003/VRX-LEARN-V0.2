import { useCallback, useEffect, useState } from "react";
import { getCourseContent } from "@/services/courseContent.service";

export default function useCourseContent(courseId) {
  const [courseContent, setCourseContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourseContent = useCallback(async () => {
    if (!courseId) return;
    setLoading(true);
    try {
      const data = await getCourseContent(courseId);
      setCourseContent(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [courseId]);


  useEffect(() => {
    fetchCourseContent();
  }, [fetchCourseContent]);


  return {
    courseContent,
    loading,
    error,
    fetchCourseContent
  };
}