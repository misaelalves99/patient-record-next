// src/contexts/AuthProvider.tsx

import React, { useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { User, LoginCredentials, RegisterData } from "../types/auth.types";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Mock login (substitua depois por API real)
  const login = async (credentials: LoginCredentials) => {
    const fakeToken = "mock-token-123";
    const fakeUser: User = {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: credentials.email,
      role: "doctor",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setToken(fakeToken);
    setUser(fakeUser);
    localStorage.setItem("auth_token", fakeToken);
    localStorage.setItem("auth_user", JSON.stringify(fakeUser));
  };

  // Mock register (substitua depois por API real)
  const register = async (data: RegisterData) => {
    const fakeToken = "mock-token-456";
    const newUser: User = {
      id: "2",
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setToken(fakeToken);
    setUser(newUser);
    localStorage.setItem("auth_token", fakeToken);
    localStorage.setItem("auth_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
