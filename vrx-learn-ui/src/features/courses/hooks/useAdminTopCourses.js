import { useEffect, useState } from "react";
import { getAdminTopCourses } from "@/services/courses.service";

export default function useAdminTopCourses() {
  const [topCourses, setTopCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTopCourses() {
      try {
        const topCoursesData = await getAdminTopCourses();
        setTopCourses(topCoursesData);
      } catch (err) {
        console.warn(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTopCourses();
  }, []);

  return { topCourses, loading, error };
}
