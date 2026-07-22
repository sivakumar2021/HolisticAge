export function activationEmail(name: string | null, activationUrl: string) {
  const greeting = name ? `Hi ${name},` : "Hi,";
  const subject = "Activate your Holistic Age account";
  const text = `${greeting}\n\nWelcome to Holistic Age. Click the link below to set your password and activate your account:\n\n${activationUrl}\n\nThis link expires in 24 hours.\n\n— Holistic Age`;
  const html = `<p>${greeting}</p><p>Welcome to Holistic Age. Click the link below to set your password and activate your account:</p><p><a href="${activationUrl}">${activationUrl}</a></p><p>This link expires in 24 hours.</p><p>— Holistic Age</p>`;
  return { subject, text, html };
}
