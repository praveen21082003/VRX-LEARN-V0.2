import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../services/profile.service";
import { FillPageLoading } from '@/components/ui'


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewRole, setViewRole] = useState(() => {
    const saved = localStorage.getItem("viewRole");
    return saved && saved !== "null" && saved !== "undefined" ? saved : null;
  });



  useEffect(() => {
    let isMounted = true;
    const initAuth = async () => {
      try {
        const res = await getMe();
        if (isMounted) {
          setUser(res);
          const userRole = res?.role?.toLowerCase();


          if (userRole === "trainee") {
            setViewRole(null);
            localStorage.removeItem("viewRole");
          }


          else if (userRole === "trainer" && !viewRole) {
            setViewRole("trainer");
          }
        }
      } catch (err) {
        if (isMounted) {
          setUser(null);
          setViewRole(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    initAuth();
    return () => { isMounted = false; };
  }, []);


  useEffect(() => {
    if (user) {
      const userRole = user?.role?.toLowerCase();

      if (userRole === "trainee") {
        setViewRole(null);
      }
    }
  }, [user]);



  useEffect(() => {
    if (viewRole) {
      localStorage.setItem("viewRole", viewRole);
    } else {
      localStorage.removeItem("viewRole");
    }
  }, [viewRole]);


  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.clear();
    localStorage.removeItem("viewRole");
  };


  return (
    <AuthContext.Provider value={{
      user,
      role: user?.role?.toLowerCase(),
      viewRole,
      setViewRole,
      logout,
      loading,
      isAuthenticated: !!user,
      setUser,
      setLoading
    }}>
      {loading ? <FillPageLoading /> : children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null || context === undefined) {
    return {
      user: null,
      loading: true, // Default to loading state
      isAuthenticated: false,
      role: null
    };
  }

  return context;
}
