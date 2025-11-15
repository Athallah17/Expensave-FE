// context/AuthContext.tsx
import { useContext } from "react";
import { AuthContext } from "./AuthProvider"; // or the file where you defined AuthContext

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
