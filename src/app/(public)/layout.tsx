import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { Footer } from "@/components/layout/Footer";
import { auth } from "../../../auth";
import { prisma } from "@/lib/prisma";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  const user = session?.user
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { name: true, email: true, image: true, role: true },
      })
    : null;

  return (
    <div className="flex min-h-full flex-col">
      {user ? (
        <AppNavbar
          name={user.name}
          email={user.email}
          image={user.image}
          isAdmin={user.role === "ADMIN"}
        />
      ) : (
        <PublicNavbar />
      )}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
