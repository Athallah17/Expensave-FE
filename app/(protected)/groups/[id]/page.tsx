"use client"
import { useEffect, useState } from "react";
import GroupsLayout from "@/components/templates/GroupsLayout";
import GroupMembersActions from "@/components/molecules/GroupMembersAction";
import { useParams } from "next/navigation";
import { useGroup } from "@/hooks/useGroup";

export default function GroupDetailsPage() {
    const { id } = useParams(); // get groupId from URL
    const { getGroupDetails, addMember, removeMember } = useGroup();
    const [group, setGroup] = useState<any>(null);
    const fetchGroup = async () => {
        if (!id) return;
        const res: any = await getGroupDetails(id as string);
        setGroup(res?.data ?? null);
        console.log(res.data);
    };

    useEffect(() => {
        fetchGroup();
    }, [id]);

    if (!group) {
        return (
        <GroupsLayout>
            <div className="p-4 text-center text-gray-500">Loading group details...</div>
        </GroupsLayout>
        );
    }
return (
    <GroupsLayout>
        <div className="space-y-4 p-4">
            <h1 className="text-2xl font-bold mb-4">{group.name}</h1>
            <p className="text-gray-600 mb-2">{group.description}</p>
            <p className="text-sm text-gray-500 mb-4">
                Created at: {new Date(group.createdAt).toLocaleString()}
            </p>

            <h2 className="text-xl font-semibold mb-2">Members</h2>
            <GroupMembersActions
                groupId={id as string}
                onAdd={async (userId: string) => {
                await addMember(id as string, userId);
                await fetchGroup(); // refresh list
                }}
                onRemove={async (memberId: string) => {
                await removeMember(id as string, memberId);
                await fetchGroup(); // refresh list
                }}
            />
            <ul className="space-y-2">
                {group.members.map((m: any) => (
                    <li
                    key={m.id}
                    className="border p-3 rounded-lg flex justify-between items-center text-md font-semibold bg-lime-200"
                    >
                    <span>
                        {m.user?.name ?? `User ${m.userId}`} <span className="text-xs text-gray-400">({m.userId})</span>
                    </span>
                    <span className="text-sm text-gray-500">{m.role}</span>
                    </li>
                ))}
            </ul>
        </div>
    </GroupsLayout>
    );
}