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
    const [showAddModal, setShowAddModal] = useState(false);
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

            {/* Group Expense, Splits, Settlements */}
            <div>
                SECTION GROUP EXPENSE
            </div>


            <h2 className="text-xl font-semibold mb-2">Members</h2>
            <div className="flex flex-col ">
                <div className="mb-4 w-full max-w-xs">
                    <GroupMembersActions
                        groupId={id as string}
                        onAdd={async (userId: string) => {
                            await addMember(id as string, { shortCode: userId });
                            await fetchGroup();
                        }}
                            showAddModal={showAddModal}
                            setShowAdd={setShowAddModal}
                        // onRemove={async (memberId: string) => {
                        //     await removeMember(id as string, memberId);
                        //     await fetchGroup();
                        // }}
                    />
                </div>
                <ul className="space-y-2 w-full max-w-xs">
                    {group.members.map((m: any) => (
                        <li
                            key={m.id}
                            className="border p-2 rounded-lg flex justify-between items-center text-md font-medium bg-white shadow-sm"
                        >
                            <div className="flex items-center gap-2 justify-evenly flex-1">
                                <span className="truncate">
                                    {m.user?.name ?? `User ${m.userId}`}
                                    <span className="text-xs text-gray-400 ml-1">
                                        ({m.user?.shortCode})
                                    </span>
                                </span>
                            </div>
                            <span className="text-xs text-gray-500 ml-4 min-w-[60px] text-right">{m.role}</span>
                            <button
                                className="ml-2 px-2 py-1 rounded hover:bg-red-100 text-red-500 text-xs transition"
                                title="Remove member"
                                onClick={async () => {
                                    await removeMember(id as string, m.user?.id);
                                    await fetchGroup();
                                }}
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </GroupsLayout>
    );
}