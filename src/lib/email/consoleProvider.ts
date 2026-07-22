import type { EmailService, SendEmailParams } from "./EmailService";

// Default local-dev provider: logs the email instead of sending it, so the
// full signup/activation/reminder flow works with zero external API keys.
export class ConsoleEmailService implements EmailService {
  async send({ to, subject, text }: SendEmailParams): Promise<void> {
    console.log(
      `\n----- EMAIL (console provider) -----\nTo: ${to}\nSubject: ${subject}\n\n${text}\n--------------------------------------\n`,
    );
  }
}
