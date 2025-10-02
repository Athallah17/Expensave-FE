import GroupsLayout from "@/components/templates/GroupsLayout";
import { GroupForm } from "@/components/organisms/GroupForm";

export default function NewGroupPage() {
  return (
    <GroupsLayout>
      <h1 className="text-xl font-bold mb-4">Create Group</h1>
      <GroupForm />
    </GroupsLayout>
  );
}
