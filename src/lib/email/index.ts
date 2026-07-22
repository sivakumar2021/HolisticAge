import type { EmailService } from "./EmailService";
import { ConsoleEmailService } from "./consoleProvider";
import { ResendEmailService } from "./resendProvider";

let cached: EmailService | undefined;

export function getEmailService(): EmailService {
  if (cached) return cached;
  cached =
    process.env.EMAIL_PROVIDER === "resend" && process.env.RESEND_API_KEY
      ? new ResendEmailService()
      : new ConsoleEmailService();
  return cached;
}

export type { EmailService, SendEmailParams } from "./EmailService";
