import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { activateSchema } from "@/lib/validation/schemas";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = activateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { token, password } = parsed.data;

  const activationToken = await prisma.activationToken.findUnique({ where: { token } });
  if (!activationToken || activationToken.usedAt || activationToken.expiresAt < new Date()) {
    return NextResponse.json({ error: "This activation link is invalid or has expired." }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: activationToken.userId },
      data: { passwordHash, status: "ACTIVE", emailVerified: new Date() },
    }),
    prisma.activationToken.update({
      where: { id: activationToken.id },
      data: { usedAt: new Date() },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
