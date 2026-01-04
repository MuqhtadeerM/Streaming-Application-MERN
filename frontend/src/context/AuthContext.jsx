import { createContext, useContext, useState } from "react";
import api from "../api/axios";

// store the login state globally
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  //   call thhe login api from backend
  const login = async (email, password) => {
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      setUser({ email });

      return true;
    } catch (error) {
      alert("Login Failed", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  //   clears the token form backend
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

export const useAuth = () => useContext(AuthContext);
