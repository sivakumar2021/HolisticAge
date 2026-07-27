import { requireUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { WeightsEditor } from "@/components/settings/WeightsEditor";
import { BirthDateForm } from "@/components/settings/BirthDateForm";
import { getEffectiveWeights } from "@/lib/weights";

export default async function SettingsPage() {
  const sessionUser = await requireUser();

  const [user, weightRows] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: sessionUser.id }, select: { birthDate: true } }),
    prisma.componentWeight.findMany({ where: { userId: sessionUser.id } }),
  ]);

  const weights = getEffectiveWeights(weightRows);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-semibold text-stone-900">Settings</h1>

      <Card className="mb-6">
        <h2 className="mb-4 font-semibold text-stone-900">Birth date</h2>
        <BirthDateForm initialBirthDate={user.birthDate?.toISOString().slice(0, 10) ?? null} />
      </Card>

      <Card>
        <h2 className="mb-1 font-semibold text-stone-900">Component weights</h2>
        <p className="mb-4 text-sm text-stone-500">
          Customize how much each component contributes to your Holistic Age. Drag a slider to
          give a component more weight — the others automatically shrink to keep the total at
          100%.
        </p>
        <WeightsEditor initialWeights={weights} />
      </Card>
    </div>
  );
}
