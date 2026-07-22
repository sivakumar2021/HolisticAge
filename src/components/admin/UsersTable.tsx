"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export interface AdminUserRow {
  id: string;
  email: string;
  name: string | null;
  role: "USER" | "ADMIN";
  status: "PENDING" | "ACTIVE" | "SUSPENDED";
  lastAssessmentAt: string | null;
  createdAt: string;
}

export function UsersTable({ users, currentAdminId }: { users: AdminUserRow[]; currentAdminId: string }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function toggleStatus(user: AdminUserRow) {
    const nextStatus = user.status === "SUSPENDED" ? "ACTIVE" : "SUSPENDED";
    setPendingId(user.id);
    await fetch(`/api/admin/users/${user.id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    setPendingId(null);
    router.refresh();
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-stone-200 text-left text-stone-500">
          <th className="py-2 font-medium">User</th>
          <th className="py-2 font-medium">Role</th>
          <th className="py-2 font-medium">Status</th>
          <th className="py-2 font-medium">Last assessment</th>
          <th className="py-2 font-medium">Joined</th>
          <th className="py-2 font-medium"></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-b border-stone-100 last:border-0">
            <td className="py-2">
              <div className="font-medium text-stone-800">{user.name ?? "—"}</div>
              <div className="text-xs text-stone-500">{user.email}</div>
            </td>
            <td className="py-2">{user.role}</td>
            <td className="py-2">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  user.status === "ACTIVE"
                    ? "bg-emerald-100 text-emerald-800"
                    : user.status === "SUSPENDED"
                      ? "bg-red-100 text-red-800"
                      : "bg-stone-100 text-stone-600"
                }`}
              >
                {user.status}
              </span>
            </td>
            <td className="py-2 text-stone-500">
              {user.lastAssessmentAt ? user.lastAssessmentAt.slice(0, 10) : "—"}
            </td>
            <td className="py-2 text-stone-500">{user.createdAt.slice(0, 10)}</td>
            <td className="py-2 text-right">
              {user.id === currentAdminId ? (
                <span className="text-xs text-stone-400">You</span>
              ) : (
                <Button
                  variant={user.status === "SUSPENDED" ? "outline" : "danger"}
                  disabled={pendingId === user.id || user.status === "PENDING"}
                  onClick={() => toggleStatus(user)}
                  className="px-3 py-1 text-xs"
                >
                  {user.status === "SUSPENDED" ? "Activate" : "Suspend"}
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
