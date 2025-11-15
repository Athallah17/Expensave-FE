// User Type
export type User = {
  id: number;
  uuid: string;
  shortCode: string;
  name: string;
  email: string;
  createdAt: string;
};

// Group Member Type
export type GroupMember = {
  id: number;
  groupId: number;
  userId: number;
  role: string;
  joinedAt: string;
  user: User;
};

// Group Type
export type Group = {
  id: number;
  uuid: string;
  shortCode: string;
  name: string;
  description?: string;
  createdBy: number;
  createdAt: string;
  creator: User;
  members: GroupMember[];
};

// Expense Type
export type Expense = {
  id: number;
  title: string;
  description?: string;
  amount: number;
  category?: string;
  paidBy: number;
  createdAt: string;
  payer: User;
  groupId?: number;
  group?: Group;
};
