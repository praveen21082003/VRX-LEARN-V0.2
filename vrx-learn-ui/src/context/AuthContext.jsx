import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewRole, setViewRole] = useState(() => {
    return localStorage.getItem("viewRole");
  });

  const isAuthenticated = !user;
  const role = user?.role;


  useEffect(() => {
    if (viewRole) {
      localStorage.setItem("viewRole", viewRole);
    } else {
      localStorage.removeItem("viewRole");
    }
  }, [viewRole]);



  return (
    <AuthContext.Provider value={{ user, role, viewRole, setViewRole, loading, isAuthenticated, setUser, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
