export function passwordResetEmail(name: string | null, resetUrl: string) {
  const greeting = name ? `Hi ${name},` : "Hi,";
  const subject = "Reset your Holistic Age password";
  const text = `${greeting}\n\nWe received a request to reset your password. Click the link below to choose a new one:\n\n${resetUrl}\n\nThis link expires in 1 hour. If you didn't request this, you can safely ignore this email — your password won't be changed.\n\n— Holistic Age`;
  const html = `<p>${greeting}</p><p>We received a request to reset your password. Click the link below to choose a new one:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>This link expires in 1 hour. If you didn't request this, you can safely ignore this email — your password won't be changed.</p><p>— Holistic Age</p>`;
  return { subject, text, html };
}
