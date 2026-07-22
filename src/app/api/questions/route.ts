import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const questions = await prisma.question.findMany({
    where: { isActive: true },
    orderBy: [{ component: "asc" }, { order: "asc" }],
  });

  return NextResponse.json({ questions });
}
