#!/usr/bin/env bash
# One-shot launcher: starts Postgres, starts the Next.js dev server, opens the
# app in the browser once it's ready. Ctrl+C stops the dev server and Postgres.
set -euo pipefail
cd "$(dirname "$0")/.."

APP_URL="http://localhost:3000"

echo "Starting Postgres..."
./scripts/db-start.sh

echo "Starting Next.js dev server..."
npm run dev &
DEV_PID=$!

cleanup() {
  echo ""
  echo "Shutting down..."
  kill "$DEV_PID" 2>/dev/null || true
  ./scripts/db-stop.sh 2>/dev/null || true
}
trap cleanup EXIT INT TERM

echo "Waiting for $APP_URL to respond..."
for _ in $(seq 1 60); do
  if curl -s -o /dev/null "$APP_URL"; then
    break
  fi
  sleep 1
done

if curl -s -o /dev/null "$APP_URL"; then
  echo "Opening $APP_URL"
  if command -v open >/dev/null 2>&1; then
    open "$APP_URL"          # macOS
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$APP_URL"      # Linux
  else
    echo "Open $APP_URL in your browser."
  fi
else
  echo "Dev server didn't come up in time — check the output above."
fi

wait "$DEV_PID"
