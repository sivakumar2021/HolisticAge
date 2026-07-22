// Single source of truth for which OAuth providers are configured, so
// auth.ts (registers them) and the login/signup UI (shows/hides buttons)
// never drift out of sync.
export const ENABLED_OAUTH_PROVIDERS = {
  google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  apple: Boolean(process.env.APPLE_CLIENT_ID && process.env.APPLE_CLIENT_SECRET),
  facebook: Boolean(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET),
} as const;
