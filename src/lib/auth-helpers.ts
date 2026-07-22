import { auth } from "../../auth";
import { redirect } from "next/navigation";
import type { Session } from "next-auth";

export async function getSession(): Promise<Session | null> {
  return auth();
}

/** For use in server components/route handlers that require a logged-in, non-suspended user. */
export async function requireUser(): Promise<Session["user"]> {
  const session = await auth();
  if (!session?.user || session.user.status === "SUSPENDED") {
    redirect("/login");
  }
  return session.user;
}

/** For use in server components/route handlers that require an admin. */
export async function requireAdmin(): Promise<Session["user"]> {
  const user = await requireUser();
  if (user.role !== "ADMIN") {
    redirect("/dashboard");
  }
  return user;
}
