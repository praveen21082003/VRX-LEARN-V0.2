import { useCallback, useEffect, useState } from "react";
import { getCourseContent, getCourseOverview } from "@/services/courseContent.service";

export default function useCourseContent() {
  const [courseContent, setCourseContent] = useState(null);
  const [courseOverview, setCourseOverview] = useState(null);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourseContent = useCallback(async (courseId, type) => {
    console.log("HOOK START: ID:", courseId, "TYPE:", type);
    setError(null);
    if (!courseId) return;
    setLoading(true);
    try {
      const data = await getCourseContent(courseId, type);
      setCourseContent(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);


  const fetchCourseOverview = useCallback(async (courseId, type) => {

    console.log("courseId", courseId, "type", type)
    setError(null);
    if (!courseId) return;
    setLoading(true);
    try {
      const data = await getCourseOverview(courseId, type);
      setCourseOverview(data);
    } catch (err) {
      setCourseOverview(null);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);


  return {
    courseContent,
    setCourseContent,
    courseOverview,

    loading,
    error,

    fetchCourseContent,
    fetchCourseOverview
  };
}