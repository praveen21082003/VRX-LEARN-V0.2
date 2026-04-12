import { useState, useCallback } from "react";
import { getUsers } from "@/services/adminListView.service";

export const useUsersData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchUsers = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const res = await getUsers(params); 

      setUsers(res.data || []);
      setTotal(res.totalItems || 0);

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    setUsers,
    loading,
    error,
    fetchUsers,
    total
  };
};

