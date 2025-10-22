
import { ModalButton } from "./ModalButton";
import { GroupForm } from "@/components/organisms/GroupForm";
import { ExpenseForm } from "../organisms/ExpenseForm";

export const QuickActions = () => {
  return (
    <div className="flex items-center justify-center p-6 rounded-lg">
      <div className="flex gap-4">
        <ModalButton
          className=" text-white hover:bg-green-600"
          label="Create New Expense"
          modalComponent={<ExpenseForm />}
        />
        <ModalButton
          className=" text-white hover:bg-green-600"
          label="Create New Group"
          modalComponent={<GroupForm />}
        />
      </div>
    </div>
  );
};
