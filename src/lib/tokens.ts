import { randomBytes } from "crypto";

export const ACTIVATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24h
export const PASSWORD_RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1h — shorter-lived than activation

function generateToken(): string {
  return randomBytes(32).toString("hex");
}

export function generateActivationToken(): string {
  return generateToken();
}

export function activationTokenExpiry(now: Date = new Date()): Date {
  return new Date(now.getTime() + ACTIVATION_TOKEN_TTL_MS);
}

export function generatePasswordResetToken(): string {
  return generateToken();
}

export function passwordResetTokenExpiry(now: Date = new Date()): Date {
  return new Date(now.getTime() + PASSWORD_RESET_TOKEN_TTL_MS);
}
