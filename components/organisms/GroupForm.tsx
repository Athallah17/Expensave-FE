"use client";

import { useState } from "react";
import { CustomButton } from "@/components/atoms/CustomButton";
import { CustomInput } from "@/components/atoms/CustomInput";
import { useGroup } from "@/hooks/useGroup";

// Placeholder avatar component
function MemberAvatar({ uuid }: { uuid: string }) {
  return (
    <div className="inline-block mr-2">
      <img
        src="/placeholder-avatar.png"
        alt={uuid}
        className="w-8 h-8 rounded-full border"
      />
    </div>
  );
}

export function GroupForm() {
  const [form, setForm] = useState({ name: "", description: "" });
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const { createGroup } = useGroup();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createGroup({ ...form, members });
    setForm({ name: "", description: "" });
    setMembers([]);
    setMemberInput("");
  }

  function handleAddMember() {
    if (memberInput && !members.includes(memberInput)) {
      setMembers([...members, memberInput]);
      setMemberInput("");
    }
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
      {/* Members */}
      <div>
        <div className="flex items-center justify-between">
          <CustomInput
          label="Add Member (UUID)"
          id="members"
          name="members"
          value={memberInput}
          onChange={(e) => setMemberInput(e.target.value)}
          />
          <div className="p-2">
            <CustomButton
              type="button"
              onClick={handleAddMember}
              className="px-2 py-1 text-sm w-8 h-8 flex items-center justify-center"
              aria-label="Add Member"
              >
              +
            </CustomButton>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap">
          {members.map((uuid) => (
        <MemberAvatar key={uuid} uuid={uuid} />
          ))}
        </div>
      </div>

      <CustomButton type="submit">Create Group</CustomButton>
    </form>
  );
}
