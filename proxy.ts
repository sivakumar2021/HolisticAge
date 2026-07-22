import NextAuth from "next-auth";
import authConfig from "./auth.config";

// Next.js 16 renamed the `middleware` file convention to `proxy`. This stays
// on the lightweight auth.config.ts (no Prisma adapter) so route gating never
// needs a DB round trip — it only reads the JWT via the `authorized` callback.
export const { auth: proxy } = NextAuth(authConfig);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/assessment/:path*",
    "/history/:path*",
    "/settings/:path*",
    "/profile/:path*",
    "/admin/:path*",
  ],
};
