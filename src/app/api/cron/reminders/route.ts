import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isDueForReassessment } from "@/lib/reminders";
import { getEmailService } from "@/lib/email";
import { reminderEmail } from "@/lib/email/templates/reminder";

const REMINDER_COOLDOWN_DAYS = 25;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const cooldownCutoff = new Date(now.getTime() - REMINDER_COOLDOWN_DAYS * 24 * 60 * 60 * 1000);

  const candidates = await prisma.user.findMany({
    where: { status: "ACTIVE" },
    select: { id: true, email: true, name: true, lastAssessmentAt: true },
  });

  let sent = 0;
  for (const user of candidates) {
    if (!isDueForReassessment(user.lastAssessmentAt, now)) continue;

    const recentReminder = await prisma.emailLog.findFirst({
      where: { userId: user.id, type: "REMINDER", sentAt: { gte: cooldownCutoff } },
    });
    if (recentReminder) continue;

    const assessmentUrl = `${process.env.NEXT_PUBLIC_APP_URL}/assessment`;
    const { subject, html, text } = reminderEmail(user.name, assessmentUrl);
    await getEmailService().send({ to: user.email, subject, html, text });
    await prisma.emailLog.create({ data: { userId: user.id, type: "REMINDER" } });
    sent++;
  }

  return NextResponse.json({ checked: candidates.length, sent });
}
