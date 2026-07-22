import "dotenv/config";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

async function main() {
  const res = await fetch(`${baseUrl}/api/cron/reminders`, {
    headers: { Authorization: `Bearer ${process.env.CRON_SECRET}` },
  });
  const body = await res.json();
  console.log(res.status, body);
}

main();
