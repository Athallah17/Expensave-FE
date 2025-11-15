"use client";
import { useEffect,useState } from "react";
import GroupsLayout from "@/components/templates/GroupsLayout";
import { GroupCard } from "@/components/molecules/GroupCard";
import { useGroup } from "@/hooks/useGroup";
import { ModalButton } from "@/components/molecules/ModalButton";
import { GroupForm } from "@/components/organisms/GroupForm";
import GroupContent from "@/components/organisms/group/GroupContent";

export default function GroupsPage() {
  const { getGroups } = useGroup();
  const [groups, setGroups] = useState<any[]>([]);

    useEffect(() => {
    getGroups().then((response: any) => {
        setGroups(response?.data ?? []);
    });
    }, []); // run only once

  return (
    <GroupsLayout>
      {/* <h1 className="text-2xl font-bold mb-4">My Groups</h1>
      <div className="mb-6 space-y-4">
        <p className="mb-6 text-gray-600">Manage your expense groups here. Create new groups, view existing ones, and track shared expenses with friends and family.</p>
        <ModalButton
          label="Create New Group"
          modalComponent={<GroupForm />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((g: any) => (
          <GroupCard key={g.id} id={g.id} name={g.name} description={g.description} />
        ))}
      </div> */}
      <GroupContent />
    </GroupsLayout>
  );
}