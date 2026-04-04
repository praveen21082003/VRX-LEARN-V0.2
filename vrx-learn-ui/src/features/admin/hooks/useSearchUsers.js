import { useState } from "react";
import { searchByUserOrEmail } from "@/services/enrollments.service";

export const useSearchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (query) => {
    try {
      setLoading(true);
      const res = await searchByUserOrEmail(query);
      setUsers(res.data);
    } finally {
      setLoading(false);
    }
  };

  return { users, fetchUsers, loading };
};