import { useState } from "react";
import { searchByCourse } from "@/services/enrollments.service";

export const useSearchCourses = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async (query) => {
    try {
      setLoading(true);
      const res = await searchByCourse(query);
      setUsers(res.data);
    } finally {
      setLoading(false);
    }
  };

  return { users, fetchCourses, loading };
};