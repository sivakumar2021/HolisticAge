import type { NextAuthConfig } from "next-auth";

const PROTECTED_APP_PATHS = /^\/(dashboard|assessment|history|settings|profile)(\/|$)/;

// Providers are intentionally empty here — they're added in auth.ts (Node
// runtime, needs Prisma/bcrypt). This file only holds what proxy.ts needs:
// callbacks that read the JWT, no DB access.
export default {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.uid = user.id!;
        token.role = user.role!;
        token.status = user.status!;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.uid;
      session.user.role = token.role;
      session.user.status = token.status;
      return session;
    },
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isAdminPath = pathname.startsWith("/admin");
      const isProtectedAppPath = PROTECTED_APP_PATHS.test(pathname);

      if (!auth?.user && (isProtectedAppPath || isAdminPath)) return false;
      if (auth?.user?.status === "SUSPENDED") return false;
      if (isAdminPath && auth?.user?.role !== "ADMIN") return false;
      return true;
    },
  },
} satisfies NextAuthConfig;
