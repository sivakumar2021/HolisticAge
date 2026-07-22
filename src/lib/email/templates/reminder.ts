export function reminderEmail(name: string | null, assessmentUrl: string) {
  const greeting = name ? `Hi ${name},` : "Hi,";
  const subject = "Time for your monthly Holistic Age check-in";
  const text = `${greeting}\n\nIt's been about a month since your last assessment. Take a few minutes to check in and see how your Holistic Age is trending:\n\n${assessmentUrl}\n\n— Holistic Age`;
  const html = `<p>${greeting}</p><p>It's been about a month since your last assessment. Take a few minutes to check in and see how your Holistic Age is trending:</p><p><a href="${assessmentUrl}">${assessmentUrl}</a></p><p>— Holistic Age</p>`;
  return { subject, text, html };
}
