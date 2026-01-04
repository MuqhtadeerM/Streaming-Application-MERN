import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // ✅ Initialize user from localStorage (lazy init)
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { isAuthenticated: true } : null;
  });

  const [loading, setLoading] = useState(false);

  // ✅ No state mutation on mount anymore
  useEffect(() => {
    // Optional: token validation API can go here later
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      setUser({ email, isAuthenticated: true });
      return true;
    } catch (error) {
      alert("Login failed");
      console.log(error);
      setLoading(true);

      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
// eslint-disable-next-line
export const useAuth = () => useContext(AuthContext);
