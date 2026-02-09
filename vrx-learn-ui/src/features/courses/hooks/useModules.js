import { useEffect, useState } from "react";
import { getCourseModules } from "@/services/courses.service";

export default function useModules(courseId) {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getModules() {
      try {
        const response = await getCourseModules(courseId);
        setModules(response);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getModules();
  }, []);

  return { modules, loading, error };
}
