import { useState, useCallback } from "react";
import { getEnrollments } from "@/services/adminListView.service";

export const useEnrollmentData = () => {
  const [enrollments, setEnrollments] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchEnrollments = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const res = await getEnrollments(params);
      console.log(res);


      setEnrollments(res.data || []);
      setTotal(res.totalItems || 0);

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
      setEnrollments([]); 
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    enrollments,
    loading,
    error,
    fetchEnrollments,
    total
  };
};

