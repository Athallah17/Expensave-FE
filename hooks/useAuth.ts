import { useState } from "react";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";

interface AuthForm {
  name?: string;
  email: string;
  password: string;
}

export function useAuth(type: "login" | "register") {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (form: AuthForm) => {
    setLoading(true);
    setError("");

    try {
      if (type === "register") {
        // Register user
        await authService.register(form.name!, form.email, form.password);
        router.push("/auth/login"); // redirect to login page
      } else {
        // Login user and store tokens automatically via authService
        await authService.login(form.email, form.password);
        router.push("/dashboard"); // redirect after login
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleAuth };
}
