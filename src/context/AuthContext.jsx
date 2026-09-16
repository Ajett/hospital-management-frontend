import { createContext, useContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to load user:", error);
      return null;
    }
  });

  const saveAuthentication = (
    accessToken,
    refreshToken,
    username,
    role
  ) => {
    const loggedInUser = {
      username: username || "",
      role: role || "",
    };

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    setUser(loggedInUser);
  };

  const login = async (username, password) => {
    const response = await api.post("/api/auth/login", {
      username,
      password,
    });

    const data = response.data;

    saveAuthentication(
      data.accessToken,
      data.refreshToken,
      data.username || username,
      data.role
    );

    return data;
  };

  const loginWithTokens = (
    accessToken,
    refreshToken,
    username,
    role
  ) => {
    if (!accessToken) {
      throw new Error("Access token not received");
    }

    if (!refreshToken) {
      throw new Error("Refresh token not received");
    }

    if (!role) {
      throw new Error("User role not received");
    }

    saveAuthentication(
      accessToken,
      refreshToken,
      username,
      role
    );
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      if (refreshToken) {
        await api.post("/api/auth/logout", {
          refreshToken,
        });
      }
    } catch (error) {
      console.warn("Logout API failed:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      setUser(null);
    }
  };

  const isAuthenticated = Boolean(
    user && localStorage.getItem("accessToken")
  );

  const role = user?.role?.toUpperCase();

  const isAdmin = role === "ADMIN";
  const isPatient = role === "PATIENT";

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithTokens,
        logout,
        isAuthenticated,
        isAdmin,
        isPatient,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}