import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { UsersTable } from "@/components/admin/UsersTable";

export default async function AdminUsersPage() {
  const admin = await requireAdmin();

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      lastAssessmentAt: true,
      createdAt: true,
    },
  });

  const rows = users.map((u) => ({
    ...u,
    lastAssessmentAt: u.lastAssessmentAt?.toISOString() ?? null,
    createdAt: u.createdAt.toISOString(),
  }));

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-semibold text-stone-900">Users</h1>
      <Card>
        <UsersTable users={rows} currentAdminId={admin.id} />
      </Card>
    </div>
  );
}
