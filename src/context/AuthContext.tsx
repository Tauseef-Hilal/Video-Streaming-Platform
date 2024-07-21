"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { JwtPayload } from "jsonwebtoken";
import { AUTH_TOKEN_KEY } from "@/lib/constants";
import { verifyTokenAndGetPayload } from "@/lib/utils/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      const { userId } = verifyTokenAndGetPayload(token) as JwtPayload;
      setUserId(userId);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    const { userId } = verifyTokenAndGetPayload(token) as JwtPayload;
    setUserId(userId);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsLoggedIn(false);
    setUserId("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
