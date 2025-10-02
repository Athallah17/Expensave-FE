"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface Props {
  groupId: string;
  onAdd: (userId: string) => Promise<void>;
  onRemove: (memberId: string) => Promise<void>;
}

export default function GroupMembersActions({ groupId, onAdd, onRemove }: Props) {
    const [showAdd, setShowAdd] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const [inputId, setInputId] = useState("");

    return (
        <div className="flex gap-2">
        {/* Add Button */}
        <button
            onClick={() => setShowAdd(true)}
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
        >
            <Plus size={20} />
        </button>

        {/* Remove Button */}
        <button
            onClick={() => setShowRemove(true)}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
            <Minus size={20} />
        </button>

        {/* Add Modal */}
        {showAdd && (
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
                    onClick={() => setShowAdd(false)}
                    className="px-3 py-1 rounded bg-gray-300"
                >
                    Cancel
                </button>
                <button
                    onClick={async () => {
                    if (inputId) {
                        await onAdd(inputId);
                        setInputId("");
                        setShowAdd(false);
                    }
                    }}
                    className="px-3 py-1 rounded bg-green-500 text-white"
                >
                    Add
                </button>
                </div>
            </div>
            </div>
        )}

        {/* Remove Modal */}
        {showRemove && (
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
                    onClick={() => setShowRemove(false)}
                    className="px-3 py-1 rounded bg-gray-300"
                >
                    Cancel
                </button>
                <button
                    onClick={async () => {
                    if (inputId) {
                        await onRemove(inputId);
                        setInputId("");
                        setShowRemove(false);
                    }
                    }}
                    className="px-3 py-1 rounded bg-red-500 text-white"
                >
                    Remove
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}
