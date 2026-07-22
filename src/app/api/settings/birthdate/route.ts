import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "@/lib/prisma";
import { birthDateSchema } from "@/lib/validation/schemas";

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.status === "SUSPENDED") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = birthDateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { birthDate: new Date(parsed.data.birthDate) },
  });

  return NextResponse.json({ ok: true });
}
