import { randomBytes } from "crypto";

export const ACTIVATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24h

export function generateActivationToken(): string {
  return randomBytes(32).toString("hex");
}

export function activationTokenExpiry(now: Date = new Date()): Date {
  return new Date(now.getTime() + ACTIVATION_TOKEN_TTL_MS);
}
