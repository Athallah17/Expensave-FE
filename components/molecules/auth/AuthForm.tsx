"use client";

import { useState } from "react";
import { CustomInput } from "@/components/atoms/CustomInput";
import { CustomButton } from "@/components/atoms/CustomButton";
import { useAuth } from "@/hooks/useAuth";

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { loading, error, handleAuth } = useAuth(type);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuth(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm mx-auto">
      {type === "register" && (
        <CustomInput
          label="Name"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      )}
      <CustomInput
        label="Email"
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <CustomInput
        label="Password"
        id="password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <CustomButton type="submit" disabled={loading}>
        {loading ? "Loading..." : type === "login" ? "Login" : "Register"}
      </CustomButton>
    </form>
  );
}
