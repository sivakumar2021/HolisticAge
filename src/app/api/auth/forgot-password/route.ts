import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/validation/schemas";
import { generatePasswordResetToken, passwordResetTokenExpiry } from "@/lib/tokens";
import { getEmailService } from "@/lib/email";
import { passwordResetEmail } from "@/lib/email/templates/password-reset";

// Always returns the same generic response regardless of whether the email
// is registered, has a password, or is active — avoids leaking which
// emails have accounts.
export async function POST(request: Request) {
  const body = await request.json();
  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { email } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (user && user.passwordHash && user.status === "ACTIVE") {
    const token = generatePasswordResetToken();
    await prisma.passwordResetToken.create({
      data: { token, userId: user.id, expiresAt: passwordResetTokenExpiry() },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`;
    const { subject, html, text } = passwordResetEmail(user.name, resetUrl);
    try {
      await getEmailService().send({ to: email, subject, html, text });
    } catch (err) {
      console.error("Failed to send password reset email:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
