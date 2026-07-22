import { requireAdmin } from "@/lib/auth-helpers";
import { AppNavbar } from "@/components/layout/AppNavbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="flex min-h-full flex-col">
      <AppNavbar name={admin.name ?? null} email={admin.email!} image={admin.image ?? null} isAdmin />
      <main className="flex-1 bg-stone-50">{children}</main>
    </div>
  );
}
