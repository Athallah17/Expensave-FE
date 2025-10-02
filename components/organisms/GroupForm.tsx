"use client";

import { useState } from "react";
import { CustomButton } from "@/components/atoms/CustomButton";
import { CustomInput } from "@/components/atoms/CustomInput";
import { useGroup } from "@/hooks/useGroup";

export function GroupForm() {
  const [form, setForm] = useState({ name: "", description: "" });
  const { createGroup } = useGroup();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createGroup(form);
    setForm({ name: "", description: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <CustomInput
        label="Group Name"
        id="name"
        name="name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <CustomInput
        label="Description"
        id="description"
        name="description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <CustomButton type="submit">Create Group</CustomButton>
    </form>
  );
}
