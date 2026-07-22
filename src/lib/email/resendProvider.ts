import type { EmailService, SendEmailParams } from "./EmailService";

// Lazily imports `resend` so the package is only touched when actually configured.
export class ResendEmailService implements EmailService {
  async send({ to, subject, html, text }: SendEmailParams): Promise<void> {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM ?? "Holistic Age <onboarding@holisticage.app>",
      to,
      subject,
      html,
      text,
    });
    if (error) {
      throw new Error(`Resend send failed: ${error.name} — ${error.message}`);
    }
  }
}
