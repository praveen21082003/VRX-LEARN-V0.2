import { useEffect, useState } from "react";
import { getEnrolledCourses } from "@/services/dashboard.service";

export default function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const coursesData = await getEnrolledCourses();
        setCourses(coursesData);
      } catch (err) {
        console.warn(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return { courses, loading, error };
}
