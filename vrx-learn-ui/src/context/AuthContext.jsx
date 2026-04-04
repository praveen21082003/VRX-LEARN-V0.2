import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../services/profile.service";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [viewRole, setViewRole] = useState(() => {
    const saved = localStorage.getItem("viewRole");
    return (saved === "null" || saved === "undefined") ? null : saved;
  });

  const isAuthenticated = !!user;
  const role = user?.role?.toLowerCase();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await getMe();
        setUser(res);

        if (res?.role === "trainer" && !viewRole) {
          setViewRole("trainer");
        }
      } catch (err) {
        console.error("GET ME ERROR:", err);
        setUser(null);
        setViewRole(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);


  useEffect(() => {
    if (viewRole) {
      localStorage.setItem("viewRole", viewRole);
    } else {
      localStorage.removeItem("viewRole");
    }
  }, [viewRole]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{
      user, role, viewRole, setViewRole,
      loading, isAuthenticated, setUser, setLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}



export function useAuth() {
  return useContext(AuthContext);
}
