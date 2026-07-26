import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validation/schemas";
import { generateActivationToken, activationTokenExpiry } from "@/lib/tokens";
import { getEmailService } from "@/lib/email";
import { activationEmail } from "@/lib/email/templates/activation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { name, email, birthDate } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      status: "PENDING",
      birthDate: birthDate ? new Date(birthDate) : undefined,
    },
  });

  const token = generateActivationToken();
  await prisma.activationToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: activationTokenExpiry(),
    },
  });

  const activationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/activate/${token}`;
  const { subject, html, text } = activationEmail(name ?? null, activationUrl);
  try {
    await getEmailService().send({ to: email, subject, html, text });
  } catch (err) {
    // Don't fail signup just because the activation email couldn't be
    // delivered (e.g. Resend sandbox restrictions) — the account still
    // exists and an admin can resend/share the link manually.
    console.error("Failed to send activation email:", err);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
