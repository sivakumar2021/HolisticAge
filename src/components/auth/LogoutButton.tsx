"use client";

import { signOut } from "next-auth/react";

export function LogoutButton({ className = "text-sm font-medium text-stone-500 hover:text-stone-800" }: { className?: string }) {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })} className={className}>
      Log out
    </button>
  );
}
