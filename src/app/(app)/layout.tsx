import { requireUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { isDueForReassessment } from "@/lib/reminders";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { DueBanner } from "@/components/layout/DueBanner";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const sessionUser = await requireUser();
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: sessionUser.id },
    select: { name: true, email: true, image: true, role: true, lastAssessmentAt: true },
  });

  const due = isDueForReassessment(user.lastAssessmentAt);

  return (
    <div className="flex min-h-full flex-col">
      <AppNavbar
        name={user.name}
        email={user.email}
        image={user.image}
        isAdmin={user.role === "ADMIN"}
      />
      {due && <DueBanner neverAssessed={!user.lastAssessmentAt} />}
      <main className="flex-1 bg-stone-50">{children}</main>
    </div>
  );
}
