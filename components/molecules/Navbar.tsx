"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <Link href="/" className="text-2xl font-bold text-blue-600">Expensave</Link>
      <div className="flex gap-4">
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/register">Register</Link>
      </div>
    </nav>
  );
}
