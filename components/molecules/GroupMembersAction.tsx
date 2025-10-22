"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";



interface Props {
    groupId: string;
    onAdd: (userId: string) => Promise<void>;
    onRemove?: (memberId: string) => Promise<void>;
    showAddModal: boolean;
    showRemoveModal: boolean;
    onCloseAdd?: () => void;
    onCloseRemove?: () => void;
    setShowAdd: (show: boolean) => void;
    setShowRemove: (show: boolean) => void;
}


export function GroupAddMemberModal({
    open,
    onAdd,
    onClose,
}: {
    open: boolean;
    onAdd: (userId: string) => Promise<void>;
    onClose: () => void;
}) {
    const [inputId, setInputId] = useState("");
    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h3 className="text-lg font-semibold mb-2">Add Member</h3>
                <input
                    type="text"
                    placeholder="Enter user ID"
                    value={inputId}
                    onChange={(e) => setInputId(e.target.value)}
                    className="border w-full px-3 py-2 rounded mb-3"
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            setInputId("");
                            onClose();
                        }}
                        className="px-3 py-1 rounded bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            if (inputId) {
                                await onAdd(inputId);
                                setInputId("");
                                onClose();
                            }
                        }}
                        className="px-3 py-1 rounded bg-green-500 text-white"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export function GroupRemoveMemberModal({
    open,
    onRemove,
    onClose,
}: {
    open: boolean;
    onRemove?: (memberId: string) => Promise<void>;
    onClose: () => void;
}) {
    const [inputId, setInputId] = useState("");
    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h3 className="text-lg font-semibold mb-2">Remove Member</h3>
                <input
                    type="text"
                    placeholder="Enter member ID"
                    value={inputId}
                    onChange={(e) => setInputId(e.target.value)}
                    className="border w-full px-3 py-2 rounded mb-3"
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            setInputId("");
                            onClose();
                        }}
                        className="px-3 py-1 rounded bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            if (inputId && onRemove) {
                                await onRemove(inputId);
                                setInputId("");
                                onClose();
                            }
                        }}
                        className="px-3 py-1 rounded bg-red-500 text-white"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}


export default function GroupMembersActions({
    groupId,
    onAdd,
    onRemove,
    showAddModal,
    showRemoveModal,
    onCloseAdd,
    onCloseRemove,
    setShowAdd,
    setShowRemove,
}: Props & {
    setShowAdd?: (show: boolean) => void;
    setShowRemove?: (show: boolean) => void;
}) {
    return (
        <div className="flex gap-2 justify-start">
            <button
                onClick={() => { setShowAdd?.(true); console.log("clicked"); }}
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex "
            >
                <div className="flex justify-center gap-8">
                    <Plus size={20} />
                </div>
            </button>
            {onRemove && (
                <button
                    onClick={() => setShowRemove?.(true)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    <Minus size={20} />
                </button>
            )}
            <GroupAddMemberModal
                open={showAddModal ?? false}
                onAdd={onAdd}
                onClose={() => {
                    setShowAdd?.(false);
                    onCloseAdd?.();
                }}
            />
            <GroupRemoveMemberModal
                open={showRemoveModal ?? false}
                onRemove={onRemove}
                onClose={() => {
                    setShowRemove?.(false);
                    onCloseRemove?.();
                }}
            />
        </div>
    );
}
