import { searchUser, searchCourse } from "@/services/adminSearch.service";
import { useCallback, useState } from "react";

export default function useSearch() {
  const [results, setResults] = useState([]);
  const [courseResult, setCourseResult] = useState([])
  const [searchLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async (type, params) => {
    if (!params) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let res;

      if (type === "users") {
        res = await searchUser(params);

        const data = res?.data || res || [];
        setResults(data);

      } else if (type === "courses") {
        res = await searchCourse(params);

        const data = res?.data || res || [];
        setCourseResult(data);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Something went wrong";
      setError(msg);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    results,
    courseResult,
    searchLoading,
    error,
    handleSearch,
  };
}