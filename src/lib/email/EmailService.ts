export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface EmailService {
  send(params: SendEmailParams): Promise<void>;
}
