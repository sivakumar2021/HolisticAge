import Link from "next/link";
import { AboutMenu } from "@/components/layout/AboutMenu";
import { ProfileMenu } from "@/components/layout/ProfileMenu";

const LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/assessment", label: "Assessment" },
  { href: "/history", label: "History" },
];

export function AppNavbar({
  name,
  email,
  image,
  isAdmin,
}: {
  name: string | null;
  email: string;
  image: string | null;
  isAdmin: boolean;
}) {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-emerald-900">
          Holistic Age
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden gap-6 text-sm font-medium text-stone-600 sm:flex">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-stone-900">
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link href="/admin/users" className="hover:text-stone-900">
                Admin
              </Link>
            )}
            <AboutMenu />
          </nav>
          <ProfileMenu name={name} email={email} image={image} />
        </div>
      </div>
    </header>
  );
}
