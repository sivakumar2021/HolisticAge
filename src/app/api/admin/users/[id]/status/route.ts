import { NextResponse } from "next/server";
import { auth } from "../../../../../../../auth";
import { prisma } from "@/lib/prisma";
import { userStatusSchema } from "@/lib/validation/schemas";

export async function PATCH(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  if (id === session.user.id) {
    return NextResponse.json({ error: "You can't change your own account status." }, { status: 400 });
  }

  const body = await request.json();
  const parsed = userStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id },
    data: { status: parsed.data.status },
    select: { id: true, email: true, status: true },
  });

  return NextResponse.json({ user });
}
