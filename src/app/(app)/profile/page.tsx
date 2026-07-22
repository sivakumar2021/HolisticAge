import Link from "next/link";
import { requireUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-stone-100 py-3 last:border-0">
      <span className="text-sm text-stone-500">{label}</span>
      <span className="text-sm font-medium text-stone-800">{value}</span>
    </div>
  );
}

export default async function ProfilePage() {
  const sessionUser = await requireUser();

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: sessionUser.id },
    select: {
      name: true,
      email: true,
      image: true,
      role: true,
      birthDate: true,
      lastAssessmentAt: true,
      createdAt: true,
    },
  });

  const initial = (user.name ?? user.email).trim().charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-semibold text-stone-900">Profile</h1>

      <Card>
        <div className="mb-6 flex items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-800 text-xl font-semibold text-white">
              {initial}
            </span>
          )}
          <div>
            <p className="text-lg font-semibold text-stone-900">{user.name ?? "Unnamed"}</p>
            <p className="text-sm text-stone-500">{user.email}</p>
          </div>
        </div>

        <Row label="Role" value={user.role === "ADMIN" ? "Admin" : "User"} />
        <Row label="Birth date" value={user.birthDate?.toISOString().slice(0, 10) ?? "Not set"} />
        <Row
          label="Last assessment"
          value={user.lastAssessmentAt?.toISOString().slice(0, 10) ?? "Never"}
        />
        <Row label="Member since" value={user.createdAt.toISOString().slice(0, 10)} />
      </Card>

      <p className="mt-4 text-sm text-stone-500">
        To update your birth date or how your Holistic Age is weighted, go to{" "}
        <Link href="/settings" className="font-medium text-emerald-800 hover:underline">
          Settings
        </Link>
        .
      </p>
    </div>
  );
}
