"use client";
import { useEffect,useState } from "react";
import GroupsLayout from "@/components/templates/GroupsLayout";
import { GroupCard } from "@/components/molecules/GroupCard";
import { useGroup } from "@/hooks/useGroup";

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
      <h1 className="text-2xl font-bold mb-4">My Groups</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((g: any) => (
          <GroupCard key={g.id} id={g.id} name={g.name} description={g.description} />
        ))}
      </div>
    </GroupsLayout>
  );
}