"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Users, CreditCard, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);

  const menu = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Groups", href: "/groups", icon: Users },
    { name: "Expenses", href: "/expenses", icon: CreditCard },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <aside
      className={`bg-white shadow-md flex flex-col transition-all duration-300 relative ${
        expanded ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setExpanded(!expanded)}
        className="absolute top-4 right-[-12px] p-1 rounded-full z-10"
      >
        <Menu size={20} />
      </Button>

      {/* Logo */}
      <div className="flex items-center justify-center p-4">
        <h2
          className={`text-xl font-bold transition-opacity duration-300 ${
            expanded ? "opacity-100" : "opacity-0"
          }`}
        >
          Expensave
        </h2>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2 flex-1 px-2 ">
        {menu.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              className={`w-full justify-start gap-2 ${
                !expanded && "justify-center"
              }`}
            >
              <item.icon size={18} />
              {expanded && item.name}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <Button
        variant="destructive"
        className={`w-full justify-start gap-2 mb-4 rounded-md ${
          !expanded && "justify-center"
        }`}
        onClick={handleLogout}
      >
        <LogOut size={18} /> {expanded && "Logout"}
      </Button>
    </aside>
  );
}
