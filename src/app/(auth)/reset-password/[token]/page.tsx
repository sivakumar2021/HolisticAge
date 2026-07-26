import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { prisma } from "@/lib/prisma";

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });

  const invalid = !resetToken || resetToken.usedAt || resetToken.expiresAt < new Date();

  if (invalid) {
    return (
      <Card>
        <h1 className="mb-2 text-xl font-semibold text-stone-900">Link invalid or expired</h1>
        <p className="mb-6 text-sm text-stone-500">
          This password reset link is no longer valid — reset links expire after 1 hour.
        </p>
        <Link href="/forgot-password" className="text-sm font-medium text-emerald-800 hover:underline">
          Request a new link
        </Link>
      </Card>
    );
  }

  return (
    <Card>
      <h1 className="mb-2 text-xl font-semibold text-stone-900">Set a new password</h1>
      <ResetPasswordForm token={token} />
    </Card>
  );
}
