import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "@/lib/prisma";
import { weightsSchema } from "@/lib/validation/schemas";
import { validateWeights, COMPONENTS } from "@/lib/weights";
import type { ComponentType } from "@/generated/prisma/enums";

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.status === "SUSPENDED") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = weightsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const weights = parsed.data.weights as Record<ComponentType, number>;
  const validation = validateWeights(weights);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  await prisma.$transaction(
    COMPONENTS.map((component) =>
      prisma.componentWeight.upsert({
        where: { userId_component: { userId: session.user.id, component } },
        update: { weight: weights[component] },
        create: { userId: session.user.id, component, weight: weights[component] },
      }),
    ),
  );

  return NextResponse.json({ ok: true });
}

// Reset to default weights by clearing all per-user overrides.
export async function DELETE() {
  const session = await auth();
  if (!session?.user || session.user.status === "SUSPENDED") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.componentWeight.deleteMany({ where: { userId: session.user.id } });
  return NextResponse.json({ ok: true });
}
