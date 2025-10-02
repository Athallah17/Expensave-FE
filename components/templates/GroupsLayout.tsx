import Sidebar from "../molecules/Sidebar";

interface GroupsLayoutProps {
  children: React.ReactNode;
}

export default function GroupsLayout({ children }: GroupsLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
