"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { groupService } from "@/services/groupService";

export function useGroup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  //Get Group List
  const getGroups = async () => {
    setLoading(true);
    setError("");
    try {
      const groups = await groupService.getMyGroups();
      return groups;
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch groups");
    } finally {
      setLoading(false);
    }
  };

  const getGroupDetails = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      // Fetch group basic info
      const group = await groupService.getGroupDetails(id);
    
      // Combine group + members
      return {
        ...group,
        members: group.data.members || [],
        memberCount: group.data.members?.length || 0,
        totalExpenses: group.data.totalExpenses || 0,
      };
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch group details");
      return null;
    } finally {
      setLoading(false);
    }
  };
  // Create group
  const createGroup = async (form: { name: string; description?: string }) => {
    setLoading(true);
    setError("");
    try {
      await groupService.createGroup(form.name, form.description);
      router.refresh(); // reload data in App Router
      router.push("/groups"); // redirect back to groups list
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create group");
    } finally {
      setLoading(false);
    }
  };

  // Update group
  const updateGroup = async (groupId: string, form: { name: string; description?: string }) => {
    setLoading(true);
    setError("");
    try {
      await groupService.updateGroup(groupId, form.name, form.description);
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update group");
    } finally {
      setLoading(false);
    }
  };

  // Delete group
  const deleteGroup = async (groupId: string) => {
    setLoading(true);
    setError("");
    try {
      await groupService.deleteGroup(groupId);
      router.refresh();
      router.push("/groups"); // after deletion, back to groups list
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to delete group");
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (groupId: string, data: { shortCode: string }) => {
    setLoading(true);
    setError("");
    try {
      await groupService.addMember(groupId, data.shortCode);
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove member
  const removeMember = async (groupId: string, userId: string) => {
    setLoading(true);
    setError("");
    try {
        await groupService.removeMember(groupId, userId);
        router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to remove member");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, createGroup, updateGroup, deleteGroup, getGroups, getGroupDetails, addMember, removeMember };
}
