import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AboutMenu } from "@/components/layout/AboutMenu";

export function PublicNavbar() {
  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-emerald-900">
          Holistic Age
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden gap-8 text-sm font-medium text-stone-600 sm:flex">
            <AboutMenu />
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-stone-700 hover:text-stone-900">
              Log in
            </Link>
            <Link href="/signup">
              <Button>Sign up free</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
