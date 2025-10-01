import { useState } from "react";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";

export function useAuth(type: "login" | "register") {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (form: { name?: string; email: string; password: string }) => {
    setLoading(true);
    setError("");
    try {
      if (type === "register") {
        await authService.register(form.name!, form.email, form.password);
        router.push("/auth/login");
      } else {
        const res = await authService.login(form.email, form.password);
        localStorage.setItem("token", res.data.token);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleAuth };
}
