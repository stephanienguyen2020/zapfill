"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedAuth === "true");
    setMounted(true);
  }, []);

  const login = async (email: string, password: string) => {
    console.log("Attempting login with:", {
      email,
      password,
      envEmail: process.env.NEXT_PUBLIC_AUTH_EMAIL,
      envPassword: process.env.NEXT_PUBLIC_AUTH_PASSWORD,
    });

    if (
      email === process.env.NEXT_PUBLIC_AUTH_EMAIL &&
      password === process.env.NEXT_PUBLIC_AUTH_PASSWORD
    ) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
