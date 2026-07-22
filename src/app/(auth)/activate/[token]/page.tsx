import { Card } from "@/components/ui/Card";
import { ActivateForm } from "@/components/auth/ActivateForm";
import { prisma } from "@/lib/prisma";

export default async function ActivatePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const activationToken = await prisma.activationToken.findUnique({
    where: { token },
    include: { user: true },
  });

  const invalid =
    !activationToken || activationToken.usedAt || activationToken.expiresAt < new Date();

  if (invalid) {
    return (
      <Card>
        <h1 className="mb-2 text-xl font-semibold text-stone-900">Link invalid or expired</h1>
        <p className="text-sm text-stone-500">
          This activation link is no longer valid. Try signing up again to get a new one.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <h1 className="mb-2 text-xl font-semibold text-stone-900">Set your password</h1>
      <p className="mb-6 text-sm text-stone-500">Activating {activationToken.user.email}</p>
      <ActivateForm token={token} email={activationToken.user.email} />
    </Card>
  );
}
